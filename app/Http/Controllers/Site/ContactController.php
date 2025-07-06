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
        $institucional = Institucional::where('slug', 'solztt-universe')
            ->with('defaultTranslation.language', 'translation.language', 'media')
            ->first();

        $institucionalTexts = Institucional::with('defaultTranslation.language', 'translation.language')
            ->whereIn('slug', [
                'tattoo-book-text',
                'criative-process',
                'consideration',
                'payment-methods',
                'warning'
            ])->get()
            ->keyBy('slug');
            

        $consideration = $institucionalTexts->get('consideration');

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
            'consideration' => $consideration,
            'languages' => $availableLangs,
            'defaultLang' => $defaultLang,
            'social' => $social,
            'metatags' => $metatags,
            'currentLanguage' => Language::where('slug', Cookie::get('locale'))->first() ?? $defaultLang,
            'portfolio' => $portfolio,
        ]);
    }

    public function store(StoreContactRequest $request)
    {
        $validatedData = $request->validated();

        if (trim($request->input('captcha_question')) !== '4') {
            return back()->withErrors(['captcha' => __('This is not good')]);
        }

        try {
            
            $contact = $this->contactService->storeContact($validatedData);

            if(count($validatedData['files'])) {
                $this->mediaUploadStrategy->upload($request->file('files'), $contact, 'contact');
            }

            return redirect()->route('site.contact', $request->cookie('locale'));
        } catch (\Exception $e) {
            dd($e);
            Log::error($e->getMessage());
            return redirect()->route('site.contact', $request->cookie('locale'))->withErrors(['error' => 'Something went wrong. Please try again.']);
        }
    }
}