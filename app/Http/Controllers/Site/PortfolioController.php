<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Models\Institucional;
use App\Models\Language;
use App\Models\Portfolio;
use App\Models\SiteSetting;
use App\Models\Social;
use App\Traits\PaginationTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use Inertia\Inertia;

class PortfolioController extends Controller
{
    use PaginationTrait;

    const PER_PAGE_HOME = 8;
    const PER_PAGE_INTERNAL = 12;

    public function index(Request $request)
    {
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

        return Inertia::render('Site/Portfolio/Index', [
            'languages' => $availableLangs,
            'defaultLang' => $defaultLang,
            'social' => $social,
            'metatags' => $metatags,
            'currentLanguage' => Language::where('slug', Cookie::get('locale'))->first() ?? $defaultLang,
            'portfolio' => $portfolio
        ]);
    }

    public function show(string $lang, string $slugPortfolio)
    {
        $availableLangs = Language::select('slug', 'name', 'default')->get();
        $defaultLang = $availableLangs->firstWhere('default', 1);
        
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
        )->where('slug', $slugPortfolio)->first();

        $socials = Social::get()->keyBy('name');
        $social['instagram'] = $socials->get('instagram');
        $social['facebook'] = $socials->get('facebook');

        $metatags = SiteSetting::with(['defaultTranslation.language', 'translation.language'])->where('slug', 'default-conf')->first();
        
        return Inertia::render('Site/Portfolio/PortfolioShow', [
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

        return response()->json(['portfolio' => $portfolio]);
    }
}
