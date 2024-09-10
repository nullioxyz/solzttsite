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
use Inertia\Inertia;

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
            ->with(['defaultTranslation'])->paginate();

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

            $institucional = $this->institucionalRepo->create(
                [
                    ...$request->validated(),
                    'content_type_id' => ContentType::TATTOO
                ]
            );

            $this->institucionalLangStrategy->create($request->get('languages'), $institucional);

            if(count($validator['files'])) {
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
            
            $this->institucionalRepo->update($institucional->id, [
                'slug' => $request->get('slug')
            ]);
            
            $this->institucionalLangStrategy->decideCreateOrUpdate($request->get('languages'), $institucional);

            if(count($validator['files'])) {
                $this->mediaUploadStrategy->upload($validator['files'], $institucional, 'institucional');
            }

            DB::commit();
        } catch (\Exception $e) {
            dd($e);
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
            DB::rollBack();
        }
    }
}
