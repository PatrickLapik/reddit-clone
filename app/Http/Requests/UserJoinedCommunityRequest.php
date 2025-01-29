<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserJoinedCommunityRequest extends FormRequest
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
            'community_id' => ['required', 'exists:communities,id', function ($attribute, $value, $fail) {
                if ($this->user()->joinedCommunity()->where('community_id', $value)->exists()) {
                    $fail('You are already joined in this community');
                }
            }]
        ];
    }
}
