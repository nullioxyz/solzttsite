<?php namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Http\Requests\Site\StoreContactRequest;
use App\Models\Institucional;
use App\Models\Language;
use App\Models\Portfolio;
use App\Models\SiteSetting;
use App\Models\Social;
use App\Services\ContactService;
use App\Strategies\Files\MediaUploadStrategy;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ContactController extends Controller
{
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
            'currentLanguage' => Language::where('slug', Cookie::get('locale'))->first() ?? $defaultLang,
            'portfolio' => $portfolio,
            'hcaptchaSiteKey' => config('services.hcaptcha.site_key'),
            'meta_title' => trans('site.contact'),
        ]);
    }

    public function store(StoreContactRequest $request)
    {
        $validatedData = $request->validated();
        $availableLangs = Language::select('slug', 'name', 'default')->get();
        $defaultLang = $availableLangs->firstWhere('default', 1);
        $lang = Cookie::get('locale') ?? $defaultLang->slug;
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

        $response = Http::asForm()->post('https://hcaptcha.com/siteverify', [
            'secret'   => $hcaptchaSecret,
            'response' => $token,
        ]);

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

            if (!empty($validatedData['files']) && is_array($validatedData['files'])) {
                $this->mediaUploadStrategy->uploadAsync($validatedData['files'], $contact, 'contact');
            }

            return redirect()->route('site.contact', ["locale" => $lang]);
        } catch (\Exception $e) {

            Log::error($e->getMessage());
            return redirect()->route('site.contact', ["locale" => $lang])->withErrors(['error' => 'Something went wrong. Please try again.']);
        }
    }
}
