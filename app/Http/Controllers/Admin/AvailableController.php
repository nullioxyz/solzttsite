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
            ->paginate(80);

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

            $languages = $request->input('languages', []);
            $slug = $this->resolveSlugFromLanguages($languages);

            $availableDesigns = $this->availableDesignRepo->create(
                [
                    ...$request->validated(),
                    'slug' => $slug,
                    'content_type_id' => ContentType::TATTOO
                ]
            );

            $this->availableDesignLangStrategy->create($request->get('languages'), $availableDesigns);

            DB::commit();

            if (!empty($validator['files']) && is_array($validator['files'])) {
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
            
            $languages = $request->input('languages', []);
            $slug = $this->resolveSlugFromLanguages($languages);

            $this->availableDesignRepo->update($availableDesign->id, [
                'slug' => $slug,
                'category_id' => $request->input('category_id'),
                'active' => $request->get('active'),
                'available' => $request->get('available')
            ]);
            
            $this->availableDesignLangStrategy->decideCreateOrUpdate($request->get('languages'), $availableDesign);

            DB::commit();

            if (!empty($validator['files']) && is_array($validator['files'])) {
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
            return response()->json(['message' => __('Unable to sort available designs')], 500);
        }
    }

    public function changeAvailability(Request $request, AvailableDesign $availableDesign)
    {
        try {
            DB::beginTransaction();

            $availableDesign->available = (bool) $request->boolean('available');
            $availableDesign->save();
            
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error($e->getMessage(), ['availableDesign' => $availableDesign->id]);
            return response()->json(['message' => __('Unable to change active status')], 500);
        }

        return response()->noContent();
    }

    public function changeActive(Request $request, AvailableDesign $availableDesign)
    {
        try {
            DB::beginTransaction();

            $availableDesign->active = (bool) $request->boolean('active');
            $availableDesign->save();
            
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error($e->getMessage(), ['availableDesign' => $availableDesign->id]);
            return response()->json(['message' => __('Unable to change availability')], 500);
        }

        return response()->noContent();
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
            Log::error($e->getMessage(), ['fileId' => $fileId, 'availableDesign' => $availableDesign->id]);
            return response()->json(['message' => __('Unable to remove file')], 500);
        }

        return response()->noContent();
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
