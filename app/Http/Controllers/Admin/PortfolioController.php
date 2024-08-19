<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StorePortfolioRequest;
use App\Http\Requests\Admin\UpdatePortfolioRequest;
use App\Models\Category;
use App\Models\ContentType;
use App\Models\Language;
use App\Models\Portfolio;
use App\Models\PortfolioLang;
use App\Repositories\Category\CategoryRepository;
use App\Repositories\Portfolio\PortfolioRepository;
use App\Strategies\Files\MediaUploadStrategy;
use App\Strategies\Translation\Portfolio\PortfolioLangStrategy;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

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
            ->with(['defaultTranslation'])->paginate();

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

            $portfolio = $this->portfolioRepo->create(
                [
                    ...$request->validated(),
                    'content_type_id' => ContentType::TATTOO
                ]
            );

            $this->portfolioLangStrategy->create($request->get('languages'), $portfolio);

            if(count($validator['files'])) {
                $this->mediaUploadStrategy->upload($validator['files'], $portfolio, 'portfolio');
            }
            
            DB::commit();
            return redirect()->route('portfolio.index')->with('success', __('Saved with success'));
        } catch (\Exception $e) {
            DB::rollback();
            
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
            
            $this->portfolioRepo->update($portfolio->id, [
                'slug' => $request->get('slug')
            ]);
            
            $this->portfolioLangStrategy->decideCreateOrUpdate($request->get('languages'), $portfolio);

            if(count($validator['files'])) {
                $this->mediaUploadStrategy->upload($validator['files'], $portfolio, 'portfolio');
            }

            DB::commit();
        } catch (\Exception $e) {
            
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

        return redirect()->route('portfolio.index')->with('success', __('Deleted with success'));
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
