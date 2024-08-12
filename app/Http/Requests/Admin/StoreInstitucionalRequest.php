<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;


class StoreInstitucionalRequest extends FormRequest
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
            'slug' => 'required|string|unique:institucional,slug',
            'languages' => 'required|array',
            'languages.*.title' => 'required|string',
            'languages.*.description' => 'required',
            'languages.*.slug' => 'required|string|unique:institucional_lang,slug',
            'files' => 'nullable|array',
            'files.*' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ];
    }

    public function messages()
    {
        return [
            'slug.required' => __('Slug is required'),
            'slug.unique' => __('Slug is already in use'),
            'languages.required' => __('At least one language is mandatory(*)'),
            'languages.*.title.required' => __('Field title is required'),
            'languages.*.description.required' => __('Field description is required'),
            'languages.*.slug.required' => __('Field language slug is required'),
            'languages.*.slug.unique' => __('Slug is already in use'),
            'files.array' => __('Images must be an array'),
            'files.*.image' => __('Each file must be an image'),
            'files.*.mimes' => __('Only JPEG, PNG and JPG files are allowed'),
            'files.*.max' => __('Each image must be less than 2MB'),
        ];
    }
}
