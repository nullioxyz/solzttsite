<?php

use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\ProfileController;
use App\Http\Controllers\Admin\InstitucionalController;
use App\Http\Controllers\Site\HomeController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::prefix('/')->group(function() {
    Route::get('/', [HomeController::class, 'index'])->name('site.index');
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
    
    Route::middleware('auth')->group(function () {
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });
    
    require __DIR__.'/auth.php';
});


