<?php

namespace App\Http\Requests\Admin;

use App\Http\Requests\Admin\Concerns\NormalizesLanguagesInput;
use App\Models\Language;
use Illuminate\Foundation\Http\FormRequest;


class UpdateAvailableDesignRequest extends FormRequest
{
    use NormalizesLanguagesInput;

    protected function prepareForValidation(): void
    {
        $this->normalizeLanguagesInput();
    }

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
        $defaultLanguageId = (int) Language::query()->where('default', 1)->value('id');

        $rules = [
            'active' => 'nullable',
            'available' => 'nullable',
            'category_id' => 'required|exists:category,id',
            'languages' => 'required|array',
            'languages.*.title' => 'nullable|string',
            'languages.*.description' => 'nullable|string',
            'files' => 'nullable|array',
            'files.*' => 'nullable|image|mimes:jpeg,png,jpg|max:10240',
        ];

        if ($defaultLanguageId > 0) {
            $rules["languages.$defaultLanguageId.title"] = 'required|string';
        } else {
            $rules['languages.*.title'] = 'required|string';
        }

        return $rules;
    }

    public function messages()
    {
        return [
            'languages.required' => __('At least one language is mandatory(*)'),
            'languages.*.title.required' => __('Field title is required'),
            'languages.*.description.required' => __('Field description is required'),
            'files.array' => __('Images must be an array'),
            'files.*.image' => __('Each file must be an image'),
            'files.*.mimes' => __('Only JPEG, PNG and JPG files are allowed'),
            'files.*.max' => __('Each image must be less than 5MB'),
        ];
    }
}
