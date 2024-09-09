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
            'slug' => 'required|string|unique:portfolio,slug',
            'theme_id' => 'required',
            'languages' => 'required|array',
            'languages.*.title' => 'required|string',
            'languages.*.description' => 'string',
            'languages.*.keywords' => 'string',
            'languages.*.slug' => 'required|string|unique:site_setting_lang,slug'
        ];
    }

    public function messages()
    {
        return [
            'slug.required' => __('Slug is required'),
            'slug.unique' => __('Slug is already in use'),
            'theme_id.required' => __('Select a theme'),
            'languages.required' => __('At least one language is mandatory(*)'),
            'languages.*.title.required' => __('Field title is required'),
            'languages.*.slug.required' => __('Field language slug is required'),
            'languages.*.keywords.required' => __('Field keywords is required'),
            'languages.*.slug.unique' => __('Slug is already in use')
        ];
    }
}
