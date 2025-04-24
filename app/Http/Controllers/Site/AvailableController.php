<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Models\AvailableDesign;
use App\Models\Institucional;
use App\Models\Language;
use App\Models\Portfolio;
use App\Models\SiteSetting;
use App\Models\Social;
use App\Traits\PaginationTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use Inertia\Inertia;

class AvailableController extends Controller
{
    use PaginationTrait;

    const PER_PAGE_HOME = 8;
    const PER_PAGE_INTERNAL = 12;

    public function index(Request $request)
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
        )->paginate(
            $this->perPage($request)
        );

        return Inertia::render('Site/AvailableDesign/Index', [
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

    public function load(Request $request)
    {
        $designs = AvailableDesign::with(
            [
                'media' =>  function($query) {
                    $query->orderBy('order_column', 'asc');
                },
                'defaultTranslation'
            ]
            )->whereHas(
                'media', function($query) {
                $query->orderBy('order_column', 'asc');
            }
        )
        ->active()
        ->paginate(
            $this->perPage($request)
        );

        return response()->json(['designs' => $designs]);
    }

}
