<?php

namespace App\Http\Requests\Admin;

use App\Http\Requests\Admin\Concerns\NormalizesLanguagesInput;
use App\Models\Language;
use Illuminate\Foundation\Http\FormRequest;


class StoreSiteSettingRequest extends FormRequest
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
            'theme_id' => 'required|exists:theme,id',
            'languages' => 'required|array',
            'languages.*.title' => 'nullable|string',
            'languages.*.description' => 'nullable|string',
            'languages.*.keywords' => 'nullable|string',
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
            'theme_id.required' => __('Select a theme'),
            'languages.required' => __('At least one language is mandatory(*)'),
            'languages.*.title.required' => __('Field title is required'),
            'languages.*.keywords.required' => __('Field keywords is required'),
        ];
    }
}
