<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Institucional;
use App\Http\Requests\Admin\StoreInstitucionalRequest;
use App\Http\Requests\Admin\UpdateInstitucionalRequest;
use App\Models\ContentType;
use App\Models\InstitucionalLang;
use App\Models\Language;
use App\Repositories\Institucional\InstitucionalRepository;
use App\Strategies\Files\MediaUploadStrategy;
use App\Strategies\Translation\Institucional\InstitucionalLangStrategy;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Illuminate\Support\Str;

class InstitucionalController extends Controller
{
    protected $institucionalRepo;
    protected $institucionalLangStrategy;
    protected $mediaUploadStrategy;

    public function __construct(InstitucionalRepository $institucionalRepo, InstitucionalLangStrategy $institucionalLangStrategy, MediaUploadStrategy $mediaUploadStrategy)
    {
        $this->institucionalRepo = $institucionalRepo;
        $this->institucionalLangStrategy = $institucionalLangStrategy;
        $this->mediaUploadStrategy = $mediaUploadStrategy;
    }

    public function index()
    {
        $institucionals = $this->institucionalRepo
            ->with(['defaultTranslation'])->paginate(20);

        return Inertia::render('Institucional/Index', [
            'institucionals' => $institucionals
        ]);
    }

    public function create()
    {   
        return Inertia::render('Institucional/Create', [
            'languages' => Language::get(),
            'translationFields' => InstitucionalLang::translationFields(),
            'translationValues' => []
        ]);
    }
    
    public function store(StoreInstitucionalRequest $request)
    {
        try {
            DB::beginTransaction();

            $validator = $request->validated();
            
            if (!$validator) {
                return redirect()->route('institucional.create')
                            ->withErrors($validator)
                            ->withInput();
            }

            $languages = $request->input('languages', []);
            $institucionalSlug = $this->resolveSlugFromLanguages($languages);

            $institucional = $this->institucionalRepo->create(
                [
                    'slug' => $institucionalSlug,
                    'content_type_id' => ContentType::TATTOO
                ]
            );

            $this->institucionalLangStrategy->create($request->get('languages'), $institucional);

            if (!empty($validator['files']) && is_array($validator['files'])) {
                $this->mediaUploadStrategy->upload($validator['files'], $institucional, 'institucional');
            }
            
            DB::commit();
            return redirect()->route('institucional.index')->with('success', __('Saved with success'));
        } catch (\Exception $e) {
            DB::rollback();
            
            return redirect()->route('institucional.create')->with('warning', __('Try again'));
        }        
    }

    public function edit(Institucional $institucional)
    {
        $institucional->getMedia('institucional');
        $institucional->load('langs');
        
        return Inertia::render('Institucional/Edit', [
            'institucional' => $institucional,
            'languages' => Language::get(),
            'translationFields' => InstitucionalLang::translationFields(),
            'translationValues' => InstitucionalLang::translationFieldValues($institucional->langs)
        ]);
    }

    public function update(UpdateInstitucionalRequest $request, Institucional $institucional)
    {
        try {
            DB::beginTransaction();

            $validator = $request->validated();

            if (!$validator) {
                return redirect()->route('institucional.create')
                        ->withErrors($validator)
                        ->withInput();
            }

            $languages = $request->input('languages', []);
            $institucionalSlug = $this->resolveSlugFromLanguages($languages);

            $this->institucionalRepo->update($institucional->id, [
                'slug' => $institucionalSlug,
                'content_type_id' => ContentType::TATTOO
            ]);
            
            $this->institucionalLangStrategy->decideCreateOrUpdate($request->get('languages'), $institucional);

            if (!empty($validator['files']) && is_array($validator['files'])) {
                $this->mediaUploadStrategy->upload($validator['files'], $institucional, 'institucional');
            }

            DB::commit();
        } catch (\Exception $e) {

            Log::error($e->getMessage(), $request->all());

            DB::rollBack();

            return redirect()->route('institucional.edit', $institucional)->with('warning', __('Something wrong. Please try again'));
        }
        
        return redirect()->route('institucional.index')->with('success', __('Saved with success'));
    }

    public function destroy(Institucional $institucional)
    {
        try {
            DB::beginTransaction();
            $this->institucionalRepo->destroy($institucional->id);
            DB::commit();
        } catch (\Exception $e) {
            Log::error($e->getMessage());

            DB::rollBack();
            return redirect()->route('institucional.edit', $institucional)->with('warning', __('Something wrong. Please try again'));
        }

        return Inertia::location(route('institucional.index'));
    }

    public function destroyFile($fileId, Institucional $institucional)
    {
        try {
            DB::beginTransaction();
            
            $this->mediaUploadStrategy->delete(
                $this->mediaUploadStrategy->getMediaById($fileId, $institucional)
            );


            DB::commit();
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            DB::rollBack();
        }
    }

    private function resolveSlugFromLanguages(array $languages): string
    {
        $defaultLanguageId = Language::query()->where('default', 1)->value('id');
        $defaultTitle = $defaultLanguageId ? data_get($languages, $defaultLanguageId . '.title') : null;

        $fallbackTitle = collect($languages)
            ->pluck('title')
            ->filter(fn ($value) => filled($value))
            ->first();

        $title = $defaultTitle ?: $fallbackTitle;

        if (blank($title)) {
            $title = Str::lower(Str::random(10));
        }

        return Str::slug($title);
    }
}
