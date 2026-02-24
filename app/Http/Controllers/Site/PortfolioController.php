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
use Illuminate\Support\Facades\App;
use Inertia\Inertia;

class PortfolioController extends Controller
{
    use PaginationTrait;

    const PER_PAGE_HOME = 8;
    const PER_PAGE_INTERNAL = 9;

    public function index(Request $request)
    {
        $availableLangs = Language::select('slug', 'name', 'default')->get();
        $defaultLang = $availableLangs->firstWhere('default', 1);

        $socials = Social::get()->keyBy('name');
        $social['instagram'] = $socials->get('instagram');
        $social['facebook'] = $socials->get('facebook');

        $metatags = SiteSetting::with(['defaultTranslation.language', 'translation.language'])->where('id', 1)->first();
        $metaImage = Institucional::where('id', 11)
            ->with('media')
            ->first();
            
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
        )
        ->orderBy("order", "asc")
        ->paginate(
            $this->perPage($request)
        );

        return Inertia::render('Site/Portfolio/Index', [
            'languages' => $availableLangs,
            'defaultLang' => $defaultLang,
            'social' => $social,
            'metatags' => $metatags,
            'metaImage' => $metaImage,
            'meta_title' => trans('site.portfolio'),
            'currentLanguage' => Language::where('slug', App::getLocale())->first() ?? $defaultLang,
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
        )->where('slug', $slugPortfolio)->firstOrFail();

        $socials = Social::get()->keyBy('name');
        $social['instagram'] = $socials->get('instagram');
        $social['facebook'] = $socials->get('facebook');

        $metatags = SiteSetting::with(['defaultTranslation.language', 'translation.language'])->where('id', 1)->first();
        $title = $portfolio->translation?->title
            ?? $portfolio->defaultTranslation?->title
            ?? config('app.name');

        $description = $portfolio->translation?->description
            ?? $portfolio->defaultTranslation?->description
            ?? '';
        
        return Inertia::render('Site/Portfolio/PortfolioShow', [
            'languages' => $availableLangs,
            'defaultLang' => $defaultLang,
            'social' => $social,
            'metatags' => $metatags,
            'meta_title' => $title,
            'meta_description' => $description,
            'currentLanguage' => Language::where('slug', App::getLocale())->first() ?? $defaultLang,
            'portfolio' => $portfolio,
            'metaImage' => $portfolio,
        ]);
    }

    public function load(Request $request)
    {
        $perPage = $this->perPage($request);

        $portfolio = Portfolio::with([
            'media' => function($query) {
                $query->orderBy('order_column', 'asc');
            },
            'defaultTranslation',
            'translation'
        ])->whereHas('media', function($query) {
            $query->orderBy('order_column', 'asc');
        })
        ->orderBy("order", "asc")
        ->paginate($perPage);

        return response()->json(['portfolio' => $portfolio]);
    }
}
