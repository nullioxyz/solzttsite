<?php

use App\Http\Controllers\Admin\AvailableController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\ProfileController;
use App\Http\Controllers\Admin\InstitucionalController;
use App\Http\Controllers\Admin\MediaController;
use App\Http\Controllers\Admin\PortfolioController;
use App\Http\Controllers\Site\AvailableController as SiteAvailableController;
use App\Http\Controllers\Site\HomeController;
use App\Http\Controllers\Site\PortfolioController as PortfolioSiteController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::prefix('/')->group(function() {
    Route::get('/', [HomeController::class, 'index'])->name('site.index');
    Route::get('/portfolio', [PortfolioSiteController::class, 'index'])->name('site.portfolio');
    Route::get('/available-designs', [SiteAvailableController::class, 'index'])->name('site.available_designs');
});

Route::prefix('justiceroom')->group(function() {
    Route::get('/', function () {
        return redirect()->route('login');
    });
    
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->middleware(['auth', 'verified'])->name('dashboard');

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
    
    Route::prefix('portfolio')->group(function() {
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
        Route::delete('/delete/{available_design}', [AvailableController::class, 'destroy'])->name('available_design.delete');
        Route::delete('/delete-file/{fileId}/{available_design}', [AvailableController::class, 'destroyFile'])->name('available.removeFile');
    });

    
    Route::middleware('auth')->group(function () {
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });
    
    require __DIR__.'/auth.php';
});


