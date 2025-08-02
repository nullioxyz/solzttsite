<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;


class StorePortfolioRequest extends FormRequest
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
            'active' => 'nullable',
            'category_id' => 'required',
            'languages' => 'required|array',
            'languages.*.title' => 'required|string',
            'languages.*.description' => 'string',
            'files' => 'nullable|array',
            'files.*' => 'nullable|image|mimes:jpeg,png,jpg|max:10240',
        ];
    }

    public function messages()
    {
        return [
            'category_id.required' => __('Select a category'),
            'languages.required' => __('At least one language is mandatory(*)'),
            'languages.*.title.required' => __('Field title is required'),
            'files.array' => __('Images must be an array'),
            'files.*.image' => __('Each file must be an image'),
            'files.*.mimes' => __('Only JPEG, PNG and JPG files are allowed'),
            'files.*.max' => __('Each image must be less than 5MB'),
        ];
    }
}
