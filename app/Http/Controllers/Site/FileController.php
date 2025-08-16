<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Models\Media;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\StreamedResponse;

class FileController extends Controller
{
    public function index(Request $request)
    {
        $media = Media::findByUuid($request->uuid);
        if (!$media) abort(404);

        // ===== 1) Decidir qual conversão entregar =====
        // Prioridade: ?conversion=... > (size+format) > negociação pelo Accept > original
        $explicitConversion = $request->query('conversion'); // ex.: "lg-webp"
        $size   = $request->query('size');                   // sm|md|lg
        $format = $request->query('format');                 // avif|webp|jpg

        if (!$format) {
            $accept = strtolower($request->header('Accept', ''));
            if (str_contains($accept, 'image/avif'))      $format = 'avif';
            elseif (str_contains($accept, 'image/webp'))  $format = 'webp';
            else                                           $format = 'jpg';
        }

        // se não vier size, você pode escolher um default (ex.: lg)
        if (!$size && !$explicitConversion) $size = 'lg';

        // nome da conversão (ex.: "lg-webp", "md-jpg" etc.)
        $conversion = $explicitConversion ?: ($size ? "{$size}-{$format}" : null);

        // ===== 2) Calcular caminho no disk =====
        $disk = Storage::disk($media->disk);

        // original
        $originalPath = "{$media->id}/{$media->file_name}";
        $pathToServe  = $originalPath;
        $mimeType     = $media->mime_type ?? $disk->mimeType($originalPath) ?? 'application/octet-stream';

        if ($conversion) {
            $basename = pathinfo($media->file_name, PATHINFO_FILENAME);
            $ext      = $this->extForFormat($format); // 'jpg'|'webp'|'avif'
            // caminho padrão de conversões da Spatie
            $convPath = "{$media->id}/conversions/{$basename}-{$conversion}.{$ext}";

            if ($disk->exists($convPath)) {
                $pathToServe = $convPath;
                $mimeType    = $this->mimeForExt($ext);
            }
        }

        if (!$disk->exists($pathToServe)) abort(404);

        // ===== 3) Cache headers (ETag / Last-Modified / 304) =====
        $lastModifiedTs = optional($media->updated_at)->timestamp ?? time();
        // ETag diferente para cada conversão/arquivo
        $etag = sprintf('W/"%s-%s-%s"', $media->uuid, $pathToServe, $lastModifiedTs);

        // 304 se cliente já tem em cache
        $ifNoneMatch     = $request->header('If-None-Match');
        $ifModifiedSince = $request->header('If-Modified-Since');

        if (($ifNoneMatch && trim($ifNoneMatch) === $etag) ||
            ($ifModifiedSince && @strtotime($ifModifiedSince) === $lastModifiedTs)) {
            return response('', 304)
                ->header('ETag', $etag)
                ->header('Last-Modified', gmdate('D, d M Y H:i:s', $lastModifiedTs) . ' GMT')
                ->header('Cache-Control', 'public, max-age=31536000, immutable');
        }

        // ===== 4) Stream (não carrega em memória) =====
        $stream = $disk->readStream($pathToServe);
        if ($stream === false) abort(404);

        return new StreamedResponse(function () use ($stream) {
            fpassthru($stream);
            if (is_resource($stream)) fclose($stream);
        }, 200, [
            'Content-Type'  => $mimeType,
            'ETag'          => $etag,
            'Last-Modified' => gmdate('D, d M Y H:i:s', $lastModifiedTs) . ' GMT',
            'Cache-Control' => 'public, max-age=31536000, immutable',
        ]);
    }

    private function extForFormat(string $format): string
    {
        return match (strtolower($format)) {
            'avif' => 'avif',
            'webp' => 'webp',
            default => 'jpg',
        };
    }

    private function mimeForExt(string $ext): string
    {
        return match (strtolower($ext)) {
            'avif' => 'image/avif',
            'webp' => 'image/webp',
            'jpg', 'jpeg' => 'image/jpeg',
            'png' => 'image/png',
            default => 'application/octet-stream',
        };
    }
}
