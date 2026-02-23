<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreSiteSettingRequest;
use App\Http\Requests\Admin\UpdateSiteSettingRequest;
use App\Models\Language;
use App\Models\SiteSetting;
use App\Models\SiteSettingLang;
use App\Repositories\SiteSetting\SiteSettingRepository;
use App\Repositories\Theme\ThemeRepository;
use App\Strategies\Translation\SiteSetting\SiteSettingLangStrategy;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Str;

class SiteSettingController extends Controller
{
    protected $siteSettingRepo;
    protected $siteSettingLangStrategy;
    protected $themeRepo;

    public function __construct(SiteSettingRepository $siteSettingRepo, SiteSettingLangStrategy $siteSettingLangStrategy, ThemeRepository $themeRepo)
    {
        $this->siteSettingRepo = $siteSettingRepo;
        $this->siteSettingLangStrategy = $siteSettingLangStrategy;
        $this->themeRepo = $themeRepo;
    }

    public function index()
    {
        $settings = $this->siteSettingRepo
            ->with(['defaultTranslation'])->paginate(20);

        return Inertia::render('SiteSetting/Index', [
            'settings' => $settings
        ]);
    }

    public function create()
    {   
        return Inertia::render('SiteSetting/Create', [
            'languages' => Language::get(),
            'translationFields' => SiteSettingLang::translationFields(),
            'themes' => $this->themeRepo->toSelectTheme(),
            'translationValues' => []
        ]);
    }
    
    public function store(StoreSiteSettingRequest $request)
    {
        try {
            
            DB::beginTransaction();

            $validator = $request->validated();

            $languages = $request->get('languages');
            $slug = Str::slug($languages[2]['title']);

            $siteSetting = $this->siteSettingRepo->create(
                [
                    'slug' => $slug,
                    ...$request->validated()
                ]
            );

            $this->siteSettingLangStrategy->create($request->get('languages'), $siteSetting);
            
            DB::commit();
            return redirect()->route('site.setting.index')->with('success', __('Saved with success'));
        } catch (\Exception $e) {
            DB::rollback();
            return redirect()->route('site.setting.create')->with('warning', __('Try again'));
        }        
    }

    public function edit(SiteSetting $siteSetting)
    {
        $siteSetting->load('langs');

        return Inertia::render('SiteSetting/Edit', [
            'setting' => $siteSetting,
            'themes' => $this->themeRepo->toSelectTheme(),
            'languages' => Language::get(),
            'translationFields' => SiteSettingLang::translationFields(),
            'translationValues' => []
        ]);
    }

    public function update(UpdateSiteSettingRequest $request, SiteSetting $siteSetting)
    {
        try {
            DB::beginTransaction();

            $validator = $request->validated();

            $languages = $request->get('languages');
            $slug = Str::slug($languages[2]['title']);
            
            $this->siteSettingRepo->update($siteSetting->id, [
                'slug' => $slug
            ]);
            
            $this->siteSettingLangStrategy->decideCreateOrUpdate($request->get('languages'), $siteSetting);

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();

            return redirect()->route('site.setting.edit', $siteSetting)->with('warning', __('Something wrong. Please try again'));
        }
        
        return redirect()->route('site.setting.index')->with('success', __('Saved with success'));
    }

    public function destroy(SiteSetting $siteSetting)
    {
        try {
            DB::beginTransaction();
            $siteSetting->langs()->delete();
            $this->siteSettingRepo->destroy($siteSetting->id);
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->route('site.setting.edit', $siteSetting)->with('warning', __('Something wrong. Please try again'));
        }

        return Inertia::location(route('site.setting.index'));
    }
}
