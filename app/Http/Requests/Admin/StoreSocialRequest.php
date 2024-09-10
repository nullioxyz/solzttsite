<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;


class StoreSocialRequest extends FormRequest
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
            'name' => 'required|string|unique:social,name',
            'url' => 'required|string'
        ];
    }

    public function messages()
    {
        return [
            'name.required' => __('name is required'),
            'name.unique' => __('Name is already in use'),
            'url.required' => __('Url is required')
        ];
    }
}
