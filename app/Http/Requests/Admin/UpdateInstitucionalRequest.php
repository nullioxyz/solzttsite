<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;


class UpdateInstitucionalRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'language_id' => ['required', Rule::exists('language', 'id')],
            'content_type_id' => ['required', Rule::exists('content_type', 'id')],
            'title' => 'required',
            'subtitle' => 'required',
            'description' => 'required',
            'slug' => [
                'required',
                Rule::unique('institucional')->ignore($this->route('institucional')),
            ]
        ];
    }
}
