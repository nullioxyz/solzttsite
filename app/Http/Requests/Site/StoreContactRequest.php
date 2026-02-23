<?php

namespace App\Http\Requests\Site;

use Illuminate\Foundation\Http\FormRequest;

class StoreContactRequest extends FormRequest
{

    public function rules(): array
    {
        return [
            'tattoo_idea' => 'required|min:30',
            'size' => 'required',
            'body_location' => 'required',
            'email' => 'required|email',
            'phone' => 'required',
            'firstname' => 'required',
            'lastname' => 'nullable',
            'gender' => 'nullable',
            'city' => 'required',
            'contact_me_by' => 'nullable',
            'availability' => 'required',
            'attachments' => 'array|nullable',
            'files' => 'nullable|array|max:5',
            'files.*' => 'file|mimes:jpeg,png,jpg,pdf|max:5120',
        ];
    }

    public function messages(): array
    {
        return [
            'tattoo_idea.required' => trans("validation.tattoo_idea.required"),
            'tattoo_idea.min' => trans("validation.tattoo_idea.min"),
            'size.required' => trans("validation.size.required"),
            'body_location.required' => trans("validation.body_location.required"),
            'email.required' => trans("validation.email.required"),
            'email.email' => trans('validation.email.required'),
            'phone.required' => trans("validation.phone.required"),
            'firstname.required' => trans('validation.firstname.required'),
            'city.required' => trans("validation.city.required"),
            'availability.required' => trans('validation.availability.required'),
            'files.*.file'     => trans('validation.file.file'),
            'files.*.mimes'    => trans('validation.file.mimes'),
            'files.*.max'      => trans('validation.file.max'),
        ];
    }
}
