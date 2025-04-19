<?php

namespace App\Http\Requests\Admin;

use App\Models\AvailableDesign;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;

class StoreAvailableDesignRequest extends FormRequest
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
            'title' => 'required|string',
            'active' => 'nullable',
            'available' => 'nullable',
            'category_id' => 'nullable',
            'languages' => 'required|array',
            'languages.*.title' => 'required|string',
            'languages.*.description' => 'string',
            'languages.*.slug' => 'required|string|unique:available_design_lang,slug',
            'files' => 'nullable|array',
            'files.*' => 'nullable|image|mimes:jpeg,png,jpg|max:10240',
        ];
    }

    public function messages()
    {
        return [
            'title.required' => __('Title is required'),
            'languages.required' => __('At least one language is mandatory(*)'),
            'languages.*.title.required' => __('Field title is required'),
            'languages.*.slug.required' => __('Field language slug is required'),
            'languages.*.slug.unique' => __('Slug is already in use'),
            'files.array' => __('Images must be an array'),
            'files.*.image' => __('Each file must be an image'),
            'files.*.mimes' => __('Only JPEG, PNG and JPG files are allowed'),
            'files.*.max' => __('Each image must be less than 5MB'),
        ];
    }

    public function getDataToDraft()
    {

        $data = [
            'active' => 0,
            'is_draft' => 1,
            'slug' => Str::slug($this->get('title') ?? AvailableDesign::randomTitle()),
            'available' => $this->get('available') ?? null,
        ];

        return $data;
    }
}
