<?php namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Http\Requests\Site\StoreContactRequest;
use App\Models\Institucional;
use App\Models\Language;
use App\Models\Portfolio;
use App\Models\SiteSetting;
use App\Models\Social;
use App\Services\ContactService;
use App\Services\Meta\MetaLeadDeliveryService;
use App\Strategies\Files\MediaUploadStrategy;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

class ContactController extends Controller
{
    private const SUCCESS_SESSION_KEY = 'contact_success';

    private const SUCCESS_LINK_TTL_MINUTES = 30;

    protected $contactService;
    protected $mediaUploadStrategy;

    public function __construct(ContactService $contactService, MediaUploadStrategy $mediaUploadStrategy)
    {
        $this->contactService = $contactService;
        $this->mediaUploadStrategy = $mediaUploadStrategy;
    }

    public function index()
    {
        $consideration = Institucional::with('media', 'defaultTranslation.language', 'translation.language')
            ->where('id', 7)->first();

        $metaImage = Institucional::where('id', 11)
            ->with('media')
            ->first();

        $availableLangs = Language::select('slug', 'name', 'default')->get();
        $defaultLang = $availableLangs->firstWhere('default', 1);

        $socials = Social::get()->keyBy('name');
        $social['instagram'] = $socials->get('instagram');
        $social['facebook'] = $socials->get('facebook');

        $metatags = SiteSetting::with(['defaultTranslation.language', 'translation.language'])->where('id', 1)->first();
        
        $portfolio = Portfolio::with(
            [
                'media' =>  function($query) {
                    $query->orderBy('order_column', 'asc');
                },
                'defaultTranslation',
                'translation'
            ]
            )->whereHas(
                'media', function($query) {
                $query->orderBy('order_column', 'asc');
            }
        )->paginate(4);

        return Inertia::render('Site/Contact/Index', [
            'consideration' => $consideration,
            'languages' => $availableLangs,
            'defaultLang' => $defaultLang,
            'social' => $social,
            'metatags' => $metatags,
            'metaImage' => ($consideration && $consideration->media && $consideration->media->count())
                ? $consideration
                : $metaImage,
            'currentLanguage' => Language::where('slug', App::getLocale())->first() ?? $defaultLang,
            'portfolio' => $portfolio,
            'hcaptchaSiteKey' => config('services.hcaptcha.site_key'),
            'meta_title' => trans('site.contact'),
        ]);
    }

    public function store(StoreContactRequest $request, MetaLeadDeliveryService $metaLeadDelivery)
    {
        $validatedData = $request->validated();
        $metaTracking = Arr::pull($validatedData, 'meta_tracking', []);
        $metaTracking['references_count'] = count($validatedData['attachments'] ?? []);
        $metaTracking['uploaded_files_count'] = count($validatedData['files'] ?? []);
        $availableLangs = Language::select('slug', 'name', 'default')->get();
        $defaultLang = $availableLangs->firstWhere('default', 1);
        $lang = App::getLocale() ?: $defaultLang->slug;
        $token = $request->input('token');

        if (!$token) {
            return redirect()->route('site.contact', ["locale" => $lang])
                            ->withErrors(['error' => __("Fail to check recaptcha")]);
        }

        $hcaptchaSecret = config('services.hcaptcha.secret');

        if (empty($hcaptchaSecret)) {
            Log::error('hCaptcha secret is not configured.');
            return redirect()->route('site.contact', ["locale" => $lang])
                            ->withErrors(['error' => __("Fail to check recaptcha")]);
        }

        try {
            $response = Http::asForm()->timeout(5)->post('https://hcaptcha.com/siteverify', [
                'secret'   => $hcaptchaSecret,
                'response' => $token,
            ]);
        } catch (Throwable $exception) {
            Log::warning('hCaptcha verification request failed.', [
                'exception' => $exception::class,
            ]);

            return redirect()->route('site.contact', ["locale" => $lang])
                ->withErrors(['error' => __("Fail to check recaptcha")]);
        }

        $result = $response->json();

        if (!($result['success'] ?? false)) {
            Log::warning('hCaptcha verification failed.', [
                'error_codes' => $result['error-codes'] ?? [],
            ]);
            return redirect()->route('site.contact', ["locale" => $lang])
                            ->withErrors(['error' => __("Fail to check recaptcha")]);
        }
        

        try {
            
            $contact = $this->contactService->storeContact($validatedData);

            $metaTracking['event_id'] = $metaTracking['event_id'] ?? (string) Str::uuid();

            try {
                $metaLeadDelivery->recordAndDispatch($contact, $metaTracking, $request);
            } catch (Throwable $exception) {
                Log::warning('Meta Lead delivery could not be audited or queued.', [
                    'contact_id' => $contact->id,
                    'exception' => $exception::class,
                ]);
            }

            if (!empty($validatedData['files']) && is_array($validatedData['files'])) {
                try {
                    $this->mediaUploadStrategy->uploadAsync($validatedData['files'], $contact, 'contact');
                } catch (Throwable $exception) {
                    Log::warning('Contact attachments could not be queued after contact creation.', [
                        'contact_id' => $contact->id,
                        'exception' => $exception::class,
                    ]);
                }
            }

            $successToken = (string) Str::uuid();
            $successExpiresAt = now()->addMinutes(self::SUCCESS_LINK_TTL_MINUTES);

            $request->session()->put(self::SUCCESS_SESSION_KEY, [
                'token_hash' => hash('sha256', $successToken),
                'expires_at' => $successExpiresAt->timestamp,
                'viewed_at' => null,
                'event_id' => $metaTracking['event_id'] ?? null,
                'tracking' => [
                    'references_count' => $metaTracking['references_count'],
                    'uploaded_files_count' => $metaTracking['uploaded_files_count'],
                    'preferred_contact' => $contact->contact_me_by ?? 'unknown',
                ],
            ]);

            $successUrl = URL::temporarySignedRoute(
                'site.contact.success',
                $successExpiresAt,
                ['locale' => $lang, 'token' => $successToken],
            );

            return redirect()->to($successUrl);
        } catch (Throwable $exception) {
            Log::error('Contact creation failed.', [
                'exception' => $exception::class,
            ]);
            return redirect()->route('site.contact', ["locale" => $lang])->withErrors(['error' => 'Something went wrong. Please try again.']);
        }
    }

    public function success(Request $request, string $locale, string $token): Response|RedirectResponse
    {
        $success = $request->session()->get(self::SUCCESS_SESSION_KEY);
        $tokenMatches = is_array($success)
            && isset($success['token_hash'])
            && hash_equals((string) $success['token_hash'], hash('sha256', $token));
        $isExpired = !is_array($success)
            || !isset($success['expires_at'])
            || (int) $success['expires_at'] < now()->timestamp;

        if (!$tokenMatches || $isExpired) {
            if ($tokenMatches) {
                $request->session()->forget(self::SUCCESS_SESSION_KEY);
            }

            return redirect()->route('site.contact', ['locale' => $locale]);
        }

        $isFirstView = empty($success['viewed_at']);

        if ($isFirstView) {
            $success['viewed_at'] = now()->timestamp;
            $request->session()->put(self::SUCCESS_SESSION_KEY, $success);
        }

        $availableLangs = Language::select('slug', 'name', 'default')->get();
        $defaultLang = $availableLangs->firstWhere('default', 1);
        $socials = Social::get()->keyBy('name');
        $metatags = SiteSetting::with(['defaultTranslation.language', 'translation.language'])
            ->where('id', 1)
            ->first();
        $metaImage = Institucional::where('id', 11)->with('media')->first();

        return Inertia::render('Site/Contact/Success', [
            'languages' => $availableLangs,
            'defaultLang' => $defaultLang,
            'currentLanguage' => Language::where('slug', App::getLocale())->first() ?? $defaultLang,
            'social' => [
                'instagram' => $socials->get('instagram'),
                'facebook' => $socials->get('facebook'),
            ],
            'metatags' => $metatags,
            'metaImage' => $metaImage,
            'success' => [
                'celebrate' => $isFirstView,
                'completion_id' => hash('sha256', $token),
                'event_id' => $isFirstView ? ($success['event_id'] ?? null) : null,
                'tracking' => $isFirstView ? ($success['tracking'] ?? []) : [],
            ],
            'meta_title' => trans('site.contact_success_meta_title'),
        ]);
    }
}
