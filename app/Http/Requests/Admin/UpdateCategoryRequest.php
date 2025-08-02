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
            'languages' => 'required|array',
            'languages.*.title' => 'required|string',
        ];
    }

    public function messages()
    {
        return [
            'languages.required' => __('At least one language is mandatory(*)'),
            'languages.*.title.required' => __('Field title is required'),
        ];
    }
}
