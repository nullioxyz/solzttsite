<?php

namespace App\Http\Requests\Site;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreContactRequest extends FormRequest
{

    public function rules(): array
    {
        return [
            'tattoo_idea' => 'required|min:300',
            'references' => 'required',
            'size' => 'required',
            'body_location' => 'required',
            'email' => 'required|email',
            'phone' => 'required',
            'firstname' => 'required',
            'lastname' => 'required',
            'gender' => 'nullable',
            'city' => 'required',
            'contact_me_by' => 'nullable',
            'availability' => 'required',
            'attachments' => 'array|nullable',
        ];
    }


    public function messages(): array
    {
        return [
            'tattoo_idea.required' => __('Your tattoo idea is very important'),
            'tattoo_idea.min' => __('300 characters in the minimum text size'),
            'references.required' => __('References is required'),
            'size.required' => __('Size of tatto is required'),
            'body_location.required' => __('The body location is required'),
            'email.required' => __('Your best e-mail is required'),
            'email.email' => __('Inform a valid e-mail'),
            'phone.required' => __('Your phone number is required'),
            'firstname.required' => __('Please, tell me your name'),
            'lastname.required' => ('Your lastname is required'),
            'city.required' => __('City is required'),
            'availability.required' => __('Availability is required')
        ];
    }
}
