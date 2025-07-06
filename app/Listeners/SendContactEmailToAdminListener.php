<?php

namespace App\Listeners;

use App\Events\ContactCreated;
use App\Services\ContactService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class SendContactEmailToAdminListener implements ShouldQueue
{
    use InteractsWithQueue;
    use Queueable;
    
    public function __construct(public ContactService $contactService)
    {
        $this->contactService = $contactService;
    }

    public function handle(ContactCreated $event): void
    {
        $contact = $event->contact;

        $this->contactService->sendEmails($contact);
    }
}
