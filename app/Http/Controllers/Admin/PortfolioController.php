<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StorePortfolioRequest;
use App\Http\Requests\Admin\UpdatePortfolioRequest;
use App\Models\ContentType;
use App\Models\Language;
use App\Models\Portfolio;
use App\Models\PortfolioLang;
use App\Repositories\Category\CategoryRepository;
use App\Repositories\Portfolio\PortfolioRepository;
use App\Strategies\Files\MediaUploadStrategy;
use App\Strategies\Translation\Portfolio\PortfolioLangStrategy;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Illuminate\Support\Str;

class PortfolioController extends Controller
{
    protected $portfolioRepo;
    protected $categoryRepo;
    protected $portfolioLangStrategy;
    protected $mediaUploadStrategy;

    public function __construct(PortfolioRepository $portfolioRepo, CategoryRepository $categoryRepo, PortfolioLangStrategy $portfolioLangStrategy, MediaUploadStrategy $mediaUploadStrategy)
    {
        $this->portfolioRepo = $portfolioRepo;
        $this->categoryRepo = $categoryRepo;
        $this->portfolioLangStrategy = $portfolioLangStrategy;
        $this->mediaUploadStrategy = $mediaUploadStrategy;
    }

    public function index()
    {
        $portfolio = $this->portfolioRepo
            ->with(['defaultTranslation'])
            ->orderBy('order', 'ASC')
            ->paginate(80);

        return Inertia::render('Portfolio/Index', [
            'portfolio' => $portfolio
        ]);
    }

    public function create()
    {   
        return Inertia::render('Portfolio/Create', [
            'languages' => Language::get(),
            'translationFields' => PortfolioLang::translationFields(),
            'translationValues' => [],
            'categories' => $this->categoryRepo->toSelectCategories()
        ]);
    }
    
    public function store(StorePortfolioRequest $request)
    {
        try {
            DB::beginTransaction();

            $validator = $request->validated();

            $languages = $request->input('languages', []);
            $portfolioSlug = $this->resolveSlugFromLanguages($languages);

            $portfolio = $this->portfolioRepo->create(
                [
                    ...$request->validated(),
                    'slug' => $portfolioSlug,
                    'content_type_id' => ContentType::TATTOO
                ]
            );

            $this->portfolioLangStrategy->create($request->get('languages'), $portfolio);
            
            DB::commit();

            if (!empty($validator['files']) && is_array($validator['files'])) {
                $this->mediaUploadStrategy->uploadAsync($validator['files'], $portfolio, 'portfolio');
            }
            return redirect()->route('portfolio.index')->with('success', __('Saved with success'));
        } catch (\Exception $e) {
            DB::rollBack();

            Log::error('Erro ao salvar portfolio: '.$e->getMessage(), [
                'trace' => $e->getTraceAsString(),
            ]);
            
            return redirect()->route('portfolio.create')->with('warning', __('Try again'));
        }        
    }

    public function edit(Portfolio $portfolio)
    {
        $portfolio->load(['media' =>  function($query) {
            $query->orderBy('order_column', 'asc');
        }]);

        $portfolio->whereHas('media', function($query) {
            $query->orderBy('order_column', 'asc');
        });

        $portfolio->load('langs');

        return Inertia::render('Portfolio/Edit', [
            'portfolio' => $portfolio,
            'languages' => Language::get(),
            'translationFields' => PortfolioLang::translationFields(),
            'translationValues' => PortfolioLang::translationFieldValues($portfolio->langs),
            'categories' => $this->categoryRepo->toSelectCategories()
        ]);
    }

    public function update(UpdatePortfolioRequest $request, Portfolio $portfolio)
    {
        try {
            DB::beginTransaction();

            $validator = $request->validated();

            $languages = $request->input('languages', []);
            $portfolioSlug = $this->resolveSlugFromLanguages($languages);
            
            $this->portfolioRepo->update($portfolio->id, [
                'slug' => $portfolioSlug,
                'category_id' => $request->input('category_id'),
            ]);
            
            $this->portfolioLangStrategy->decideCreateOrUpdate($request->get('languages'), $portfolio);
            
            DB::commit();
            
            if (!empty($validator['files']) && is_array($validator['files'])) {
                $this->mediaUploadStrategy->uploadAsync($validator['files'], $portfolio, 'portfolio');
            }
        } catch (\Exception $e) {
            
            Log::error('Erro ao salvar portfolio: '.$e->getMessage(), [
                'trace' => $e->getTraceAsString(),
            ]);

            DB::rollBack();

            return redirect()->route('portfolio.edit', $portfolio)->with('warning', __('Something wrong. Please try again'));
        }
        
        return redirect()->route('portfolio.index')->with('success', __('Saved with success'));
    }

    public function destroy(Portfolio $portfolio)
    {
        try {
            DB::beginTransaction();
            $this->portfolioRepo->destroy($portfolio->id);
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->route('portfolio.edit', $portfolio)->with('warning', __('Something wrong. Please try again'));
        }

        return Inertia::location(route('portfolio.index'));
    }

    public function sort(Request $request)
    {
        try {
            $ids = array_column($request->input('order'), 'id');
            $minOrder = Portfolio::whereIn('id', $ids)->min('order');

            $step = 10;
            $newOrder = $minOrder;

            DB::beginTransaction();
            
            foreach ($request->input('order') as $row) {
                Portfolio::where('id', $row['id'])
                    ->update(['order' => $newOrder]);
                $newOrder += $step;
            }

            DB::commit();

            return response()->noContent();
        } catch (\Exception $e) {
            Log::error($e->getMessage(), [$request]);
            return response()->json(['message' => __('Unable to sort portfolio items')], 500);
        }
    }

    private function bulkUpdateOrder(array $pairs): void
    {
        if (empty($pairs)) return;

        $pairs = array_map(fn($p) => [
            'id' => (int) $p['id'],
            'order' => (int) $p['order'],
        ], $pairs);

        $ids = array_column($pairs, 'id');

        $caseSql = 'CASE `id`';
        foreach ($pairs as $p) {
            $caseSql .= ' WHEN ' . $p['id'] . ' THEN ' . $p['order'];
        }
        $caseSql .= ' END';

        Portfolio::query()
            ->whereIn('id', $ids)
            ->update([
                'order' => DB::raw($caseSql),
            ]);
    }

    public function destroyFile($fileId, Portfolio $portfolio)
    {
        try {
            DB::beginTransaction();

            $media = $this->mediaUploadStrategy->getMediaById($fileId, $portfolio);
            if (!$media) {
                DB::rollBack();
                return response()->json(['message' => __('File not found for this item')], 404);
            }

            $this->mediaUploadStrategy->delete($media);

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error($e->getMessage(), ['fileId' => $fileId, 'portfolio' => $portfolio->id]);
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
