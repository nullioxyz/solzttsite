<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;


class StoreSiteSettingRequest extends FormRequest
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
            'theme_id' => 'required',
            'languages' => 'required|array',
            'languages.*.title' => 'required|string',
            'languages.*.description' => 'string',
            'languages.*.keywords' => 'string',
        ];
    }

    public function messages()
    {
        return [
            'theme_id.required' => __('Select a theme'),
            'languages.required' => __('At least one language is mandatory(*)'),
            'languages.*.title.required' => __('Field title is required'),
            'languages.*.keywords.required' => __('Field keywords is required'),
        ];
    }
}
