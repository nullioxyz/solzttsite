<?php

namespace App\Http\Requests\Admin;

use App\Models\CategoryLang;
use App\Models\InstitucionalLang;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;


class UpdateCategoryRequest extends FormRequest
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
                Rule::unique('category')->ignore($this->route('category')),
            ],
            'languages' => 'required|array',
            'languages.*.title' => 'required|string',
            'languages.*.slug' => [
                'required',
                'string',
                function ($attribute, $value, $fail) {
                    $lang = explode('.', $attribute);
                    $languages = $this->get('languages');
                    
                    $exists = CategoryLang::where('slug', $value)
                        ->where('language_id', '!=', $languages[$lang[1]]['language_id'] ?? $lang[1])
                        ->where('category_id', $this->route('category')->id)
                        ->exists();
                    
                    if ($exists) {
                        $fail(__('The slug has already been taken.'));
                    }
                },
            ],
        ];
    }

    public function messages()
    {
        return [
            'slug.required' => __('Slug is required'),
            'slug.unique' => __('Slug is already in use'),
            'languages.required' => __('At least one language is mandatory(*)'),
            'languages.*.title.required' => __('Field title is required'),
            'languages.*.slug.required' => __('Field language slug is required'),
            'languages.*.slug.unique' => __('Slug is already in use')
        ];
    }
}
