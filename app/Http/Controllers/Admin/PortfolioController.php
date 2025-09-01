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
            ->paginate(20);

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
            
            if (!$validator) {
                return redirect()->route('portfolio.create')
                            ->withErrors($validator)
                            ->withInput();
            }

            $languages = $request->get('languages');
            $portfolioSlug = Str::slug(
                $languages[2]['title'] 
                    ?? $languages[3]['title'] 
                    ?? $languages[0]['title']
            );

            $portfolio = $this->portfolioRepo->create(
                [
                    ...$request->validated(),
                    'slug' => $portfolioSlug,
                    'content_type_id' => ContentType::TATTOO
                ]
            );

            $this->portfolioLangStrategy->create($request->get('languages'), $portfolio);
            
            DB::commit();

            if(count($validator['files'])) {
                $this->mediaUploadStrategy->uploadAsync($validator['files'], $portfolio, 'portfolio');
            }
            return redirect()->route('portfolio.index')->with('success', __('Saved with success'));
        } catch (\Exception $e) {

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

            if (!$validator) {
                return redirect()->route('portfolio.create')
                        ->withErrors($validator)
                        ->withInput();
            }

            $languages = $request->get('languages');
            $categorySlug = Str::slug($languages[2]['title']);
            
            $this->portfolioRepo->update($portfolio->id, [
                'slug' => $categorySlug
            ]);
            
            $this->portfolioLangStrategy->decideCreateOrUpdate($request->get('languages'), $portfolio);
            
            DB::commit();
            
            if(count($validator['files'])) {
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
            
            $this->mediaUploadStrategy->delete(
                $this->mediaUploadStrategy->getMediaById($fileId, $portfolio)
            );

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
        }
    }
}
