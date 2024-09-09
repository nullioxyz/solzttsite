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
        // Busca a mídia pelo UUID
        $media = Media::findByUuid($request->uuid);
        
        if (!$media) {
            abort(404);
        }

        $disk = $media->disk;

        if (Storage::disk($disk)->exists($media->getPath())) {
            $file = Storage::disk($disk)->get($media->getPath());

            $finfo = new \finfo(FILEINFO_MIME_TYPE);
            $mimeType = $finfo->buffer($file);

            return response($file, 200)->header('Content-Type', $mimeType);
        }

        $defaultImagePath = 'images/default.png';

        if (Storage::disk('local')->exists($defaultImagePath)) {
            $file = Storage::disk('local')->get($defaultImagePath);

            $finfo = new \finfo(FILEINFO_MIME_TYPE);
            $mimeType = $finfo->buffer($file);

            return response($file, 200)->header('Content-Type', $mimeType);
        }
    }
}
