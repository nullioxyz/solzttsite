<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Models\Media;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FileController extends Controller
{
    public function index(Request $request)
    {
        $media = Media::findByUuid($request->uuid);
        
        if (Storage::disk('s3')->exists($media->getPath())) {
            $file = Storage::disk('s3')->get($media->getPath());
            
            $finfo = new \finfo(FILEINFO_MIME_TYPE);
            $mimeType = $finfo->buffer($file);
            
            return response($file, 200)->header('Content-Type', $mimeType);
        } else {
            abort(404);
        }
    }
}
