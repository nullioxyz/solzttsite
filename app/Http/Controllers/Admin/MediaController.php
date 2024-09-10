<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Strategies\Files\MediaUploadStrategy;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MediaController extends Controller
{
    protected $mediaStrategyUpload;
    
    public function __construct(MediaUploadStrategy $mediaStrategyUpload)
    {
        $this->mediaStrategyUpload = $mediaStrategyUpload;
    }

    public function sort(Request $request)
    {
        try {
            DB::beginTransaction();
            $this->mediaStrategyUpload->sortMedia($request->except(['preserveState', 'preserveScroll']));
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
        }
    }    
}
