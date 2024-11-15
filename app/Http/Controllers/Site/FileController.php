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

        if (!env('local') && Storage::disk('spaces')->exists($media->getPath())) {
            $file = Storage::disk('spaces')->get($media->getPath());
            
            $finfo = new \finfo(FILEINFO_MIME_TYPE);
            $mimeType = $finfo->buffer($file);
            
            return response($file, 200)->header('Content-Type', $mimeType);
        }

        $file = Storage::get($media->id . '/' . $media->file_name);
        
        $finfo = new \finfo(FILEINFO_MIME_TYPE);
        $mimeType = $finfo->buffer($file);
    
        // Retornar a resposta com o conteúdo do arquivo e o cabeçalho correto de MIME type
        return response($file, 200)->header('Content-Type', $mimeType);
    }
}
