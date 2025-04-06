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
        
        if(!$media) {
            abort(404);
        }

        if (app()->environment() !== 'local') {
            if(! Storage::disk('spaces')->exists($media->getPath())) {
                return;
            }

            $file = Storage::disk('spaces')->get($media->getPath());
            
            $finfo = new \finfo(FILEINFO_MIME_TYPE);
            $mimeType = $finfo->buffer($file);
            
            return response($file, 200)->header('Content-Type', $mimeType);
        }

        $file = Storage::disk($media->disk)->get($media->id . '/' . $media->file_name);

        $finfo = new \finfo(FILEINFO_MIME_TYPE);
        $mimeType = $finfo->buffer($file);
        
        return response($file, 200)->header('Content-Type', $mimeType);
    }
}
