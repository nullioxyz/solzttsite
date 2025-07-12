<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;

class UploadMediaJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $model;
    protected $tempPath;
    protected $mimeType;
    protected $collection;

    
    public function __construct(mixed $model, $tempPath, $mimeType, $collection)
    {
        $this->model = $model;
        $this->tempPath = $tempPath;
        $this->mimeType = $mimeType;
        $this->collection = $collection;
    }

    public function handle(): void
    {
        $fullPath = storage_path("app/public/{$this->tempPath}");

        if (!file_exists($fullPath)) return;

        $file = new \Illuminate\Http\File($fullPath);

        $this->model
            ->addMedia($file)
            ->toMediaCollection($this->collection, config('filesystems.default'));

        Storage::disk('public')->delete($fullPath);

    }
}
