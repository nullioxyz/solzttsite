<?php

namespace App\Http\Requests\Admin;

use App\Models\InstitucionalLang;
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
            'slug' => [
                'required',
                Rule::unique('institucional')->ignore($this->route('institucional')),
            ],
            'languages' => 'required|array',
            'languages.*.title' => 'required|string',
            'languages.*.description' => 'required',
            'languages.*.slug' => [
                'required',
                'string',
                function ($attribute, $value, $fail) {
                    $lang = explode('.', $attribute);
                    $languages = $this->get('languages');
                    
                    $exists = InstitucionalLang::where('slug', $value)
                        ->where('language_id', '!=', $languages[$lang[1]]['language_id'] ?? $lang[1])
                        ->where('institucional_id', $this->route('institucional')->id)
                        ->exists();
                    
                    if ($exists) {
                        $fail(__('The slug has already been taken.'));
                    }
                },
            ],
            'files' => 'nullable|array',
            'files.*' => 'nullable|image|mimes:jpeg,png,jpg|max:10240',
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
            'files.*.max' => __('Each image must be less than 5MB'),
        ];
    }
}
