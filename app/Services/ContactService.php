<?php

namespace App\Services;

use App\Events\ContactCreated;
use App\Mail\ContactMailable;
use App\Models\AvailableDesign;
use App\Models\Contact;
use App\Models\ContentType;
use App\Models\Portfolio;
use App\Repositories\Contact\ContactRepository;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

class ContactService  {
    
    protected $contactRepo;
    
    public function __construct(ContactRepository $contactRepo)
    {
        $this->contactRepo = $contactRepo;
    }

    protected function sendEmail(Contact $contact, $subject, $view, $sendTo = null)
    {
        Mail::to($sendTo)->queue(
            new ContactMailable($contact, $subject, $view, $sendTo)
        );
    }

    public function sendEmails($contact)
    {
        $contact->load([
            'portfolioReferences.defaultTranslation',
            'reservedDesign.defaultTranslation',
            'portfolioReferences.media',
            'reservedDesign.media',
        ]);
        
        $this->sendEmail(
            $contact,
            __('Contact from website'),
            'emails.contact_to_admin',
            'frankedeveloper@gmail.com'
        );
    }

    public function storeContact($validatedData)
    {
        DB::beginTransaction();

        try {
            $contact = $this->contactRepo->create([
                ...$validatedData,
                'content_type_id' => ContentType::TATTOO
            ]);

            $this->attachReferencesAndDesigns($contact, $validatedData['attachments']);

            DB::commit();

            event(new ContactCreated($contact));

            return $contact;
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    protected function attachReferencesAndDesigns($contact, $attachments)
    {
        if (!is_null($attachments) && count($attachments)) {
            $referencesToAttach = [];
            $reservedDesignsToAttach = [];

            foreach ($attachments as $attachment) {
                $data = [
                    'referenceable_type' => $attachment['type'] === 'portfolio' ? Portfolio::class : AvailableDesign::class,
                    'referenceable_id' => $attachment['id']
                ];

                if ($attachment['type'] === 'portfolio') {
                    $referencesToAttach[$attachment['id']] = $data;
                } else {
                    $reservedDesignsToAttach[$attachment['id']] = $data;
                }
            }

            if ($referencesToAttach) {
                $contact->portfolioReferences()->attach($referencesToAttach);
            }

            if ($reservedDesignsToAttach) {
                $contact->reservedDesign()->attach($reservedDesignsToAttach);
            }
        }
    }
}