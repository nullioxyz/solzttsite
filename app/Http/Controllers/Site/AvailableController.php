<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Models\AvailableDesign;
use App\Models\Institucional;
use App\Models\Language;
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
        $availableLangs = Language::select('slug', 'name', 'default')->get();
        $defaultLang = $availableLangs->firstWhere('default', 1);

        $metaImage = Institucional::where('id', 11)
            ->with('media')
            ->first();

        $socials = Social::get()->keyBy('name');
        $social['instagram'] = $socials->get('instagram');
        $social['facebook'] = $socials->get('facebook');

        $metatags = SiteSetting::with(['defaultTranslation.language', 'translation.language'])->where('id', 1)->first();
        
        return Inertia::render('Site/AvailableDesign/Index', [
            'languages' => $availableLangs,
            'defaultLang' => $defaultLang,
            'social' => $social,
            'metatags' => $metatags,
            'metaImage' => $metaImage,
            'meta_title' => trans('site.available'),
            'currentLanguage' => Language::where('slug', Cookie::get('locale'))->first() ?? $defaultLang,
        ]);
    }  

    public function show(string $lang, string $slugDesign)
    {
        $availableLangs = Language::select('slug', 'name', 'default')->get();
        $defaultLang = $availableLangs->firstWhere('default', 1);
        
        $availableDesign = AvailableDesign::with([
                'media' =>  function($query) {
                    $query->orderBy('order_column', 'asc');
                },
                'defaultTranslation',
                'translation'
            ]
            )->whereHas(
                'media', function($query) {
                $query->orderBy('order_column', 'asc');
            })->where('slug', $slugDesign)->firstOrFail();

        $socials = Social::get()->keyBy('name');
        $social['instagram'] = $socials->get('instagram');
        $social['facebook'] = $socials->get('facebook');

        $metatags = SiteSetting::with(['defaultTranslation.language', 'translation.language'])->where('id', 1)->first();
        
        $title = $availableDesign->translation?->title
            ?? $availableDesign->defaultTranslation?->title
            ?? config('app.name');

        $description = $availableDesign->translation?->description
            ?? $availableDesign->defaultTranslation?->description
            ?? '';

        return Inertia::render('Site/AvailableDesign/AvailableDesignShow', [
            'languages' => $availableLangs,
            'defaultLang' => $defaultLang,
            'social' => $social,
            'metatags' => $metatags,
            'meta_title' => $title,
            'meta_description' => $description,
            'currentLanguage' => Language::where('slug', Cookie::get('locale'))->first() ?? $defaultLang,
            'availableDesign' => $availableDesign,
            'metaImage' => $availableDesign,
        ]);
    }

    public function load(Request $request)
    {
        $perPage = $this->perPage($request);

        $designs = AvailableDesign::with([
            'media' => function($query) {
                $query->orderBy('order_column', 'asc');
            },
            'defaultTranslation',
            'translation'
        ])->whereHas('media', function($query) {
            $query->orderBy('order_column', 'asc');
        })
        ->active()
        ->orderBy("order", "asc")
        ->paginate($perPage);

        $availableLangs = Language::select('slug', 'name', 'default')->get();
        $defaultLang = $availableLangs->firstWhere('default', 1);

        return response()->json([
            'designs' => $designs,
            'currentLang' => Language::where('slug', Cookie::get('locale'))->first() ?? $defaultLang,
        ]);
    }

}
