<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreAvailableDesignRequest;
use App\Http\Requests\Admin\UpdateAvailableDesignRequest;
use App\Models\AvailableDesign;
use App\Models\AvailableDesignLang;
use App\Models\ContentType;
use App\Models\Language;
use App\Repositories\AvailableDesign\AvailableDesignRepository;
use App\Repositories\Category\CategoryRepository;
use App\Strategies\Files\MediaUploadStrategy;
use App\Strategies\Translation\AvailableDesign\AvailableDesignLangStrategy;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Illuminate\Support\Str;

class AvailableController extends Controller
{
    protected $availableDesignRepo;
    protected $categoryRepo;
    protected $availableDesignLangStrategy;
    protected $mediaUploadStrategy;

    public function __construct(AvailableDesignRepository $availableDesignRepo, CategoryRepository $categoryRepo, AvailableDesignLangStrategy $availableDesignLangStrategy, MediaUploadStrategy $mediaUploadStrategy)
    {
        $this->availableDesignRepo = $availableDesignRepo;
        $this->categoryRepo = $categoryRepo;
        $this->availableDesignLangStrategy = $availableDesignLangStrategy;
        $this->mediaUploadStrategy = $mediaUploadStrategy;
    }

    public function index()
    {
        $availableDesigns = $this->availableDesignRepo
            ->with(['defaultTranslation'])
            ->orderBy('order', 'ASC')
            ->paginate(20);

        return Inertia::render('AvailableDesign/Index', [
            'designs' => $availableDesigns
        ]);
    }

    public function create()
    {   
        return Inertia::render('AvailableDesign/Create', [
            'languages' => Language::get(),
            'translationFields' => AvailableDesignLang::translationFields(),
            'translationValues' => [],
            'categories' => $this->categoryRepo->toSelectCategories()
        ]);
    }
    
    public function store(StoreAvailableDesignRequest $request)
    {
        try {
            
            DB::beginTransaction();

            $validator = $request->validated();
            
            if (!$validator) {
                return redirect()->route('available_design.create')
                            ->withErrors($validator)
                            ->withInput();
            }

            $languages = $request->get('languages');
            
            $slug = Str::slug(
                $languages[2]['title'] 
                    ?? $languages[3]['title'] 
                    ?? $languages[0]['title']
            );

            $availableDesigns = $this->availableDesignRepo->create(
                [
                    ...$request->validated(),
                    'slug' => $slug,
                    'content_type_id' => ContentType::TATTOO
                ]
            );

            $this->availableDesignLangStrategy->create($request->get('languages'), $availableDesigns);

            DB::commit();

            if(count($validator['files'])) {
                $this->mediaUploadStrategy->upload($validator['files'], $availableDesigns, 'availableDesigns');
            }
            
            return redirect()->route('available_design.index')->with('success', __('Saved with success'));
        } catch (\Exception $e) {
            DB::rollback();
            return redirect()->route('available_design.create')->with('warning', __('Try again'));
        }        
    }

    public function edit(AvailableDesign $availableDesign)
    {
        $availableDesign->load(['media' =>  function($query) {
            $query->orderBy('order_column', 'asc');
        }]);

        $availableDesign->whereHas('media', function($query) {
            $query->orderBy('order_column', 'asc');
        });

        $availableDesign->load('langs');

        return Inertia::render('AvailableDesign/Edit', [
            'design' => $availableDesign,
            'languages' => Language::get(),
            'translationFields' => AvailableDesignLang::translationFields(),
            'translationValues' => AvailableDesignLang::translationFieldValues($availableDesign->langs),
            'categories' => $this->categoryRepo->toSelectCategories()
        ]);
    }

    public function update(UpdateAvailableDesignRequest $request, AvailableDesign $availableDesign)
    {
        try {
            DB::beginTransaction();

            $validator = $request->validated();

            if (!$validator) {
                return redirect()->route('available_design.create')
                        ->withErrors($validator)
                        ->withInput();
            }
            
            $languages = $request->get('languages');

            $slug = Str::slug(
                $languages[2]['title'] 
                    ?? $languages[3]['title'] 
                    ?? $languages[0]['title']
            );

            $this->availableDesignRepo->update($availableDesign->id, [
                'slug' => $slug,
                'active' => $request->get('active'),
                'available' => $request->get('available')
            ]);
            
            $this->availableDesignLangStrategy->decideCreateOrUpdate($request->get('languages'), $availableDesign);

            DB::commit();

            if(count($validator['files'])) {
                $this->mediaUploadStrategy->upload($validator['files'], $availableDesign, 'availableDesigns');
            }
        } catch (\Exception $e) {
            DB::rollBack();

            return redirect()->route('available_design.edit', $availableDesign)->with('warning', __('Something wrong. Please try again'));
        }
        
        return redirect()->route('available_design.index')->with('success', __('Saved with success'));
    }

    public function sort(Request $request)
    {
        try {
            $ids = array_column($request->input('order'), 'id');
            $minOrder = AvailableDesign::whereIn('id', $ids)->min('order');

            $step = 10;
            $newOrder = $minOrder;

            DB::beginTransaction();

            foreach ($request->input('order') as $row) {
                AvailableDesign::where('id', $row['id'])
                    ->update(['order' => $newOrder]);
                $newOrder += $step;
            }
            
            DB::commit();

            return response()->noContent();
        } catch (\Exception $e) {
            Log::error($e->getMessage(), [$request]);
        }
    }

    public function changeAvailability(Request $request, AvailableDesign $availableDesign)
    {
        try {
            DB::beginTransaction();

            $availableDesign->available = $request->get('available');
            $availableDesign->save();
            
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
        }
    }

    public function destroy(AvailableDesign $availableDesign)
    {
        try {
            DB::beginTransaction();
            $this->availableDesignRepo->destroy($availableDesign->id);
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            
            return redirect()->route('available_design.edit', $availableDesign)->with('warning', __('Something wrong. Please try again'));
        }

        return Inertia::location(route('available_design.index'));
    }

    public function destroyFile($fileId, AvailableDesign $availableDesign)
    {
        try {
            DB::beginTransaction();
            
            $this->mediaUploadStrategy->delete(
                $this->mediaUploadStrategy->getMediaById($fileId, $availableDesign)
            );

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
        }
    }
}
