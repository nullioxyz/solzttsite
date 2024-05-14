<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Institucional;
use App\Repositories\InstitucionalRepository;
use App\Http\Requests\Admin\StoreInstitucionalRequest;
use App\Http\Requests\Admin\UpdateInstitucionalRequest;
use Inertia\Inertia;

class InstitucionalController extends Controller
{
    protected $institucionalRepo;

    public function __construct(InstitucionalRepository $institucionalRepo)
    {
        $this->institucionalRepo = $institucionalRepo;
    }

    public function index(Request $request)
    {
        $institucionals = $this->institucionalRepo->paginate();
        
        return Inertia::render('Institucional/Index', [
            'institucionals' => $institucionals
        ]);
    }

    public function create()
    {
        return Inertia::render('Institucional/Create');
    }
    
    public function store(StoreInstitucionalRequest $request)
    {
        if (!$request->validated()) {
            return redirect()->route('institucional.create')
                        ->withErrors($validator)
                        ->withInput();
        }

        Institucional::create($request->validated());

        return redirect()->route('institucional.index')->with('success', __('Saved with success'));
    }

    public function edit(Institucional $institucional)
    {
        return Inertia::render('Institucional/Edit', [
            'institucional' => $institucional
        ]);
    }

    public function update(UpdateInstitucionalRequest $request, Institucional $institucional)
    {
        if (!$request->validated()) {
            return redirect()->route('institucional.create')
                        ->withErrors($validator)
                        ->withInput();
        }

        $this->institucionalRepo->update($institucional, $request->validated());
        
        return redirect()->route('institucional.index')->with('success', __('Saved with success'));
    }

    public function destroy(Institucional $institucional)
    {
        $this->institucionalRepo->destroy($institucional);

        return redirect()->route('institucional.index')->with('success', __('Deleted with success'));
    }
}
