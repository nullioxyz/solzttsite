<?php

namespace App\Services;

use App\Mail\ContactMailable;
use App\Models\Contact;
use Illuminate\Support\Facades\Mail;

class ContactService  {
    

    public static function sendEmail(Contact $contact, $subject, $view, $sendTo = null)
    {
        Mail::to($sendTo ?? $contact->email)->queue(
            new ContactMailable($contact, $subject, $view)
        );
    }
}