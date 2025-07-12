<?php

namespace App\Jobs;

use App\Models\Media;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;

class DeleteMediaJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $mediaData;

    public function __construct(array $mediaData)
    {
        $this->mediaData = $mediaData;
    }
    /**
     * Execute the job.
     */
    public function handle(): void
    {
        if(! Storage::disk($this->mediaData['disk'])->exists($this->mediaData['id'] . '/' . $this->mediaData['file_name'])) {
            return;
        }

        Storage::disk($this->mediaData['disk'])->delete($this->mediaData['id'] . '/' . $this->mediaData['file_name']);
    }
}
