<?php

namespace App\Services;

use App\Mail\ContactMailable;
use App\Models\AvailableDesign;
use App\Models\Contact;
use App\Models\ContentType;
use App\Models\Portfolio;
use App\Repositories\Contact\ContactRepository;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Mail;

class ContactService  {
    
    protected $contactRepo;

    
    public function __construct(ContactRepository $contactRepo)
    {
        $this->contactRepo = $contactRepo;
    }

    protected function sendEmail(Contact $contact, $subject, $view, $sendTo = null)
    {
        Mail::to($sendTo ?? $contact->email)->queue(
            new ContactMailable($contact, $subject, $view)
        );
    }

    protected function sendEmails($contact)
    {
        //send admin e-mail
        $this->sendEmail(
            $contact,
            __('Contact from website'),
            'emails.contact_to_admin',
            env('MAIL_FROM_ADDRESS')
        );

        $this->sendEmail(
            $contact,
            __('Contact form website'),
            'emails.request_confirmation',
        );
    }

    public function verifyRecaptcha($recaptchaResponse, $ip)
    {
        if (env('APP_ENV') !== 'local') {
            $response = Http::asForm()->post('https://www.google.com/recaptcha/api/siteverify', [
                'secret' => config('services.recaptcha.secret_key'),
                'response' => $recaptchaResponse,
                'remoteip' => $ip,
            ]);

            $body = json_decode((string) $response->getBody());

            return $body->success;
        }
        
        return true;
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

            $this->sendEmails($contact);

            return $contact;
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e; // Rethrow to be caught in the controller
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