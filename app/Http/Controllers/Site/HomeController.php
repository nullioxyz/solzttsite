<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Models\Institucional;
use App\Models\Language;
use App\Models\Social;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Cookie;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function index()
    {
        $institucional = Institucional::where('slug', 'solztt-universe')
            ->with('defaultTranslation', 'translation', 'media')
            ->first();
        
        $appointmentTexts = Institucional::with(
            'defaultTranslation', 'translation'
        )->whereIn('slug', [
            'appointment-1',
            'appointment-2',
            'appointment-3',
        ])->get();
        

        $institucionalTexts = Institucional::with('defaultTranslation', 'translation')
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
        
        return Inertia::render('Site/Index', [
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
            'currentLanguage' => Language::where('slug', Cookie::get('locale'))->first() ?? App::getLocale()
        ]);
    }
}
