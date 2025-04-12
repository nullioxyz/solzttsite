<?php namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Http\Requests\Site\StoreContactRequest;
use App\Models\Institucional;
use App\Models\Language;
use App\Models\Portfolio;
use App\Models\SiteSetting;
use App\Models\Social;
use App\Services\ContactService;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ContactController extends Controller
{
    protected $contactService;

    public function __construct(ContactService $contactService)
    {
        $this->contactService = $contactService;
    }

    public function index()
    {
        $institucional = Institucional::where('slug', 'solztt-universe')
            ->with('defaultTranslation.language', 'translation.language', 'media')
            ->first();

        $appointmentTexts = Institucional::with(
            'defaultTranslation.language', 'translation.language'
        )->whereIn('slug', [
            'appointment-1',
            'appointment-2',
            'appointment-3',
        ])->get();
        

        $institucionalTexts = Institucional::with('defaultTranslation.language', 'translation.language')
            ->whereIn('slug', [
                'tattoo-book-text',
                'criative-process',
                'consideration',
                'payment-methods',
                'warning'
            ])->get()
            ->keyBy('slug');
            
        $requestSectionText = $institucionalTexts->get('tattoo-book-text');
        $appointmentWarning = $institucionalTexts->get('warning');

        $criativeProcess = $institucionalTexts->get('criative-process');
        $consideration = $institucionalTexts->get('consideration');
        $paymentMethods = $institucionalTexts->get('payment-methods');

        $availableLangs = Language::select('slug', 'name', 'default')->get();
        $defaultLang = $availableLangs->firstWhere('default', 1);

        $socials = Social::get()->keyBy('name');
        $social['instagram'] = $socials->get('instagram');
        $social['facebook'] = $socials->get('facebook');

        $metatags = SiteSetting::with(['defaultTranslation.language', 'translation.language'])->where('slug', 'default-conf')->first();
        
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
            'institucional' => $institucional,
            'appointmentTexts' => $appointmentTexts,
            'appointmentWarning' => $appointmentWarning,
            'requestSectionText' => $requestSectionText,
            'criativeProcess' => $criativeProcess,
            'consideration' => $consideration,
            'paymentMethods' => $paymentMethods,
            'languages' => $availableLangs,
            'defaultLang' => $defaultLang,
            'social' => $social,
            'metatags' => $metatags,
            'currentLanguage' => Language::where('slug', Cookie::get('locale'))->first() ?? $defaultLang,
            'portfolio' => $portfolio
        ]);
    }

    public function store(StoreContactRequest $request)
    {
        $validatedData = $request->validated();

        if (!$this->contactService->verifyRecaptcha($request->input('recaptcha'), $request->ip())) {
            return back()->withErrors(['captcha' => __('ReCAPTCHA validation failed, please try again')]);
        }

        try {
            
            $this->contactService->storeContact($validatedData);

            return redirect()->route('site.contact', $request->cookie('locale'));
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return redirect()->route('site.contact')->withErrors(['error' => 'Something went wrong. Please try again.']);
        }
    }
}