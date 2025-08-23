<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreSocialRequest;
use App\Http\Requests\Admin\UpdateSocialRequest;
use App\Models\Social;
use App\Repositories\Social\SocialRepository;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class SocialController extends Controller
{
    protected $socialRepo;

    public function __construct(SocialRepository $socialRepo)
    {
        $this->socialRepo = $socialRepo;
    }

    public function index()
    {
        $socials = $this->socialRepo->paginate(20);

        return Inertia::render('Social/Index', [
            'socials' => $socials
        ]);
    }

    public function create()
    {   
        return Inertia::render('Social/Create');
    }
    
    public function store(StoreSocialRequest $request)
    {
        try {
            
            DB::beginTransaction();

            $validator = $request->validated();
            
            if (!$validator) {
                return redirect()->route('social.create')
                            ->withErrors($validator)
                            ->withInput();
            }

            $this->socialRepo->create(
                $request->validated()
            );
            
            DB::commit();
            return redirect()->route('social.index')->with('success', __('Saved with success'));
        } catch (\Exception $e) {
            DB::rollback();
            return redirect()->route('social.create')->with('warning', __('Try again'));
        }        
    }

    public function edit(Social $social)
    {
        return Inertia::render('Social/Edit', [
            'social' => $social
        ]);
    }

    public function update(UpdateSocialRequest $request, Social $social)
    {
        try {
            DB::beginTransaction();

            $validator = $request->validated();

            if (!$validator) {
                return redirect()->route('social.create')
                        ->withErrors($validator)
                        ->withInput();
            }
            
            $this->socialRepo->update($social->id, [
                'name' => $request->get('name'),
                'url' => $request->get('url')
            ]);

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();

            return redirect()->route('social.edit', $social)->with('warning', __('Something wrong. Please try again'));
        }
        
        return redirect()->route('social.index')->with('success', __('Saved with success'));
    }

    public function destroy(Social $social)
    {
        try {
            DB::beginTransaction();
            $this->socialRepo->destroy($social->id);
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->route('social.edit', $social)->with('warning', __('Something wrong. Please try again'));
        }

        return Inertia::location(route('social.index'));
    }
}
