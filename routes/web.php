<?php

use App\Http\Controllers\Admin\AvailableController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\ProfileController;
use App\Http\Controllers\Admin\InstitucionalController;
use App\Http\Controllers\Admin\MediaController;
use App\Http\Controllers\Admin\PortfolioController;
use App\Http\Controllers\Admin\ContactRequestController;
use App\Http\Controllers\Admin\SiteSettingController;
use App\Http\Controllers\Admin\SocialController;
use App\Http\Controllers\Site\AfterCareController;
use App\Http\Controllers\Site\AvailableController as SiteAvailableController;
use App\Http\Controllers\Site\ContactController;
use App\Http\Controllers\Site\FileController;
use App\Http\Controllers\Site\HomeController;
use App\Http\Controllers\Site\PortfolioController as PortfolioSiteController;
use App\Http\Controllers\Site\TranslationController;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::prefix('/')->group(function() {
    Route::get('/', function () {
        $locale = Cookie::get('locale') ?? 'en'; // Pega do cookie ou define 'en' como padrão
        return redirect("/$locale");
    });
    
    Route::get('/{locale}', [HomeController::class, 'index'])->name('home.index');
});

Route::middleware(['lang'])->prefix('/{locale}')->group(function() {
    Route::get('/portfolio', [PortfolioSiteController::class, 'index'])->name('site.portfolio');
    Route::get('/portfolio/detail/{slug}', [PortfolioSiteController::class, 'show'])->name('site.portfolio.show');
    Route::get('/portfolio/load', [PortfolioSiteController::class, 'load'])->name('site.portfolio.load');
    

    Route::get('/after-care', [AfterCareController::class, 'index'])->name('site.after_care');

    Route::get('/contact', [ContactController::class, 'index'])->name('site.contact');
    
    Route::get('/available-designs', [SiteAvailableController::class, 'index'])->name('site.available_designs');
    Route::get('/available-designs/detail/{slug}', [SiteAvailableController::class, 'show'])->name('site.available_designs.show');
    Route::get('/load-available-designs', [SiteAvailableController::class, 'load'])->name('site.available_designs.load');
    Route::post('/save-contact', [ContactController::class, 'store'])->middleware('throttle:3,1')->name('contact.store');

    Route::get('translations', [TranslationController::class, 'getTranslations'])->name('site.translations');
    Route::post('set-language', [TranslationController::class, 'setLanguage'])->name('site.setLanguage');
    Route::get('current-language', [TranslationController::class, 'getCurrentTranslation'])->name('site.currentLanguage');

    Route::prefix('/images')->group(function() {
        Route::get('/', [FileController::class, 'index'])->name('file.index');
    });
});



Route::prefix('hall-of-justice')->group(function() {
    Route::get('/', function () {
        return redirect()->route('login');
    });
    
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->middleware(['auth', 'verified'])->name('dashboard');

    Route::prefix('site-settings')->group(function() {
        Route::get('/', [SiteSettingController::class, 'index'])->name('site.setting.index');
        Route::get('/create', [SiteSettingController::class, 'create'])->name('site.setting.create');
        Route::post('/store', [SiteSettingController::class, 'store'])->name('site.setting.store');
        Route::get('/edit/{site_setting}', [SiteSettingController::class, 'edit'])->name('site.setting.edit');
        Route::post('/save/{site_setting}', [SiteSettingController::class, 'update'])->name('site.setting.update');
        Route::delete('/delete/{site_setting}', [SiteSettingController::class, 'destroy'])->name('site.setting.delete');
    });

    Route::prefix('social')->group(function() {
        Route::get('/', [SocialController::class, 'index'])->name('social.index');
        Route::get('/create', [SocialController::class, 'create'])->name('social.create');
        Route::post('/store', [SocialController::class, 'store'])->name('social.store');
        Route::get('/edit/{social}', [SocialController::class, 'edit'])->name('social.edit');
        Route::post('/save/{social}', [SocialController::class, 'update'])->name('social.update');
        Route::delete('/delete/{social}', [SocialController::class, 'destroy'])->name('social.delete');
    });

    Route::prefix('institucional')->group(function() {
        Route::get('/', [InstitucionalController::class, 'index'])->name('institucional.index');
        Route::get('/create', [InstitucionalController::class, 'create'])->name('institucional.create');
        Route::post('/store', [InstitucionalController::class, 'store'])->name('institucional.store');
        Route::get('/edit/{institucional}', [InstitucionalController::class, 'edit'])->name('institucional.edit');
        Route::post('/save/{institucional}', [InstitucionalController::class, 'update'])->name('institucional.update');
        Route::delete('/delete/{institucional}', [InstitucionalController::class, 'destroy'])->name('institucional.delete');
        Route::delete('/delete-file/{fileId}/{institucional}', [InstitucionalController::class, 'destroyFile'])->name('institucional.removeFile');
    });

    Route::prefix('categories')->group(function() {
        Route::get('/', [CategoryController::class, 'index'])->name('category.index');
        Route::get('/create', [CategoryController::class, 'create'])->name('category.create');
        Route::post('/store', [CategoryController::class, 'store'])->name('category.store');
        Route::get('/edit/{category}', [CategoryController::class, 'edit'])->name('category.edit');
        Route::post('/save/{category}', [CategoryController::class, 'update'])->name('category.update');
        Route::delete('/delete/{category}', [CategoryController::class, 'destroy'])->name('category.delete');
    });


    Route::prefix('file')->group(function() {
        Route::post('/sort', [MediaController::class, 'sort'])->name('media.sort');
    });
    
    Route::prefix('portfilio-works')->group(function() {
        Route::get('/', [PortfolioController::class, 'index'])->name('portfolio.index');
        Route::get('/create', [PortfolioController::class, 'create'])->name('portfolio.create');
        Route::post('/store', [PortfolioController::class, 'store'])->name('portfolio.store');
        Route::get('/edit/{portfolio}', [PortfolioController::class, 'edit'])->name('portfolio.edit');
        Route::post('/save/{portfolio}', [PortfolioController::class, 'update'])->name('portfolio.update');
        Route::delete('/delete/{portfolio}', [PortfolioController::class, 'destroy'])->name('portfolio.delete');
        Route::delete('/delete-file/{fileId}/{portfolio}', [PortfolioController::class, 'destroyFile'])->name('portfolio.removeFile');
    });
    
    Route::prefix('available-design')->group(function() {
        Route::get('/', [AvailableController::class, 'index'])->name('available_design.index');
        Route::get('/create', [AvailableController::class, 'create'])->name('available_design.create');
        Route::post('/store', [AvailableController::class, 'store'])->name('available_design.store');
        Route::get('/edit/{available_design}', [AvailableController::class, 'edit'])->name('available_design.edit');
        Route::post('/save/{available_design}', [AvailableController::class, 'update'])->name('available_design.update');
        Route::post('/availability/{available_design}', [AvailableController::class, 'changeAvailability'])->name('available_design.changeAvailability');
        Route::delete('/delete/{available_design}', [AvailableController::class, 'destroy'])->name('available_design.delete');
        Route::delete('/delete-file/{fileId}/{available_design}', [AvailableController::class, 'destroyFile'])->name('available.removeFile');
    });

    Route::prefix('requests')->group(function() {
        Route::get('/', [ContactRequestController::class, 'index'])->name('contact.index');
        Route::get('/view/{contact}', [ContactRequestController::class, 'view'])->name('contact.view');
        Route::post('/save/{contact}', [ContactRequestController::class, 'update'])->name('contact.update');
        Route::delete('/delete/{contact}', [ContactRequestController::class, 'destroy'])->name('contact.delete');
    });
    

    
    Route::middleware('auth')->group(function () {
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });
    
    require __DIR__.'/auth.php';
});


