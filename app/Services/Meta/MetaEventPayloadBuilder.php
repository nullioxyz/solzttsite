<?php

namespace App\Services\Meta;

use Illuminate\Http\Request;
use Illuminate\Support\Str;

class MetaEventPayloadBuilder
{
    private const HASHED_USER_FIELDS = [
        'em', 'ph', 'fn', 'ln', 'ct', 'st', 'zp', 'country', 'external_id',
    ];

    public function build(
        string $eventName,
        string $eventId,
        string $eventSourceUrl,
        Request $request,
        array $userData = [],
        array $customData = [],
        ?int $eventTime = null,
    ): array {
        $normalizedUserData = [
            'client_ip_address' => $request->ip(),
            'client_user_agent' => $request->userAgent(),
        ];

        foreach ($userData as $key => $value) {
            if ($value === null || $value === '') {
                continue;
            }

            if (in_array($key, self::HASHED_USER_FIELDS, true)) {
                $normalized = $this->normalizeForHash($key, (string) $value);
                if ($normalized !== '') {
                    $normalizedUserData[$key] = hash('sha256', $normalized);
                }
                continue;
            }

            if (in_array($key, ['fbp', 'fbc'], true)) {
                $normalizedUserData[$key] = (string) $value;
            }
        }

        return array_filter([
            'event_name' => $eventName,
            'event_time' => $eventTime ?? now()->timestamp,
            'event_id' => $eventId,
            'action_source' => 'website',
            'event_source_url' => $eventSourceUrl,
            'user_data' => array_filter($normalizedUserData, fn ($value) => $value !== null && $value !== ''),
            'custom_data' => array_filter($customData, fn ($value) => $value !== null && $value !== ''),
        ], fn ($value) => $value !== [] && $value !== null && $value !== '');
    }

    public function buildLead(
        object $contact,
        array $tracking,
        Request $request,
    ): array {
        return $this->build(
            eventName: 'Lead',
            eventId: (string) $tracking['event_id'],
            eventSourceUrl: (string) ($tracking['event_source_url'] ?? url()->previous()),
            request: $request,
            userData: [
                'em' => $contact->email ?? null,
                'ph' => $contact->phone ?? null,
                'fn' => $contact->firstname ?? null,
                'ln' => $contact->lastname ?? null,
                'ct' => $contact->city ?? null,
                'external_id' => isset($contact->id) ? 'contact:' . $contact->id : null,
                'fbp' => $tracking['fbp'] ?? null,
                'fbc' => $tracking['fbc'] ?? null,
            ],
            customData: [
                'content_name' => 'Contact form',
                'content_category' => 'tattoo_booking',
                'references_count' => $tracking['references_count'] ?? null,
                'uploaded_files_count' => $tracking['uploaded_files_count'] ?? null,
                'preferred_contact' => $contact->contact_me_by ?? null,
            ],
        );
    }

    private function normalizeForHash(string $field, string $value): string
    {
        $value = Str::lower(trim($value));

        if ($field === 'ph') {
            return preg_replace('/\D+/', '', $value) ?? '';
        }

        if ($field === 'em') {
            return $value;
        }

        $value = Str::ascii($value);

        return preg_replace('/[^a-z0-9]/', '', $value) ?? '';
    }
}
