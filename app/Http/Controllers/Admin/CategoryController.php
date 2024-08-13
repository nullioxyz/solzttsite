<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreCategoryRequest;
use App\Http\Requests\Admin\UpdateCategoryRequest;
use App\Models\Category;
use App\Models\CategoryLang;
use App\Models\ContentType;
use App\Models\Language;
use App\Repositories\Category\CategoryRepository;
use App\Strategies\Translation\Category\CategoryLangStrategy;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CategoryController extends Controller
{
    protected $categoryRepo;
    protected $categoryLangStrategy;

    public function __construct(CategoryRepository $categoryRepo, CategoryLangStrategy $categoryLangStrategy)
    {
        $this->categoryRepo = $categoryRepo;
        $this->categoryLangStrategy = $categoryLangStrategy;
    }

    public function index()
    {
        $categories = $this->categoryRepo
            ->with(['defaultTranslation'])->paginate();

        return Inertia::render('Category/Index', [
            'categories' => $categories
        ]);
    }

    public function create()
    {   
        return Inertia::render('Category/Create', [
            'languages' => Language::get(),
            'translationFields' => CategoryLang::translationFields(),
            'translationValues' => []
        ]);
    }
    
    public function store(StoreCategoryRequest $request)
    {
        try {
            
            DB::beginTransaction();

            $validator = $request->validated();
            
            if (!$validator) {
                return redirect()->route('category.create')
                            ->withErrors($validator)
                            ->withInput();
            }

            $category = $this->categoryRepo->create(
                [
                    ...$request->validated(),
                    'content_type_id' => ContentType::TATTOO
                ]
            );

            $this->categoryLangStrategy->create($request->get('languages'), $category);
            
            DB::commit();
            return redirect()->route('category.index')->with('success', __('Saved with success'));
        } catch (\Exception $e) {
            DB::rollback();
            return redirect()->route('category.create')->with('warning', __('Try again'));
        }        
    }

    public function edit(Category $category)
    {
        $category->load('langs');

        return Inertia::render('Category/Edit', [
            'category' => $category,
            'languages' => Language::get(),
            'translationFields' => CategoryLang::translationFields(),
            'translationValues' => CategoryLang::translationFieldValues($category->langs)
        ]);
    }

    public function update(UpdateCategoryRequest $request, Category $category)
    {
        try {
            DB::beginTransaction();

            $validator = $request->validated();

            if (!$validator) {
                return redirect()->route('category.create')
                        ->withErrors($validator)
                        ->withInput();
            }
            
            $this->categoryRepo->update($category->id, [
                'slug' => $request->get('slug')
            ]);
            
            $this->categoryLangStrategy->decideCreateOrUpdate($request->get('languages'), $category);

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();

            return redirect()->route('category.edit', $category)->with('warning', __('Something wrong. Please try again'));
        }
        
        return redirect()->route('category.index')->with('success', __('Saved with success'));
    }

    public function destroy(Category $category)
    {
        try {
            DB::beginTransaction();
            $this->categoryRepo->destroy($category->id);
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->route('category.edit', $category)->with('warning', __('Something wrong. Please try again'));
        }

        return redirect()->route('category.index')->with('success', __('Deleted with success'));
    }
}
