<?php

use App\Http\Controllers\Admin\ProfileController;
use App\Http\Controllers\Admin\InstitucionalController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::prefix('justiceroom')->group(function() {
    Route::get('/', function () {
        return Inertia::render('Welcome', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
        ]);
    });
    
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->middleware(['auth', 'verified'])->name('dashboard');

    Route::prefix('institucional')->group(function() {
        Route::get('/', [InstitucionalController::class, 'index'])->name('institucional.index');
        Route::get('/create', [InstitucionalController::class, 'create'])->name('institucional.create');
        Route::post('/store', [InstitucionalController::class, 'store'])->name('institucional.store');
        Route::get('/edit', [InstitucionalController::class, 'create'])->name('institucional.edit');
        Route::post('/save/{institucional}', [InstitucionalController::class, 'update'])->name('institucional.update');
    });
    
    Route::middleware('auth')->group(function () {
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });
    
    require __DIR__.'/auth.php';
});


