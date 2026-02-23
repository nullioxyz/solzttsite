<?php

namespace App\Http\Requests\Admin\Concerns;

use App\Models\Language;

trait NormalizesLanguagesInput
{
    protected function normalizeLanguagesInput(): void
    {
        $languages = $this->input('languages');

        if (!is_array($languages)) {
            return;
        }

        $validLanguageIds = Language::query()
            ->pluck('id')
            ->map(fn ($id) => (int) $id)
            ->all();

        if (empty($validLanguageIds)) {
            return;
        }

        // Associative payloads keyed by language id are already acceptable.
        if (!array_is_list($languages)) {
            $normalized = [];

            foreach ($languages as $key => $item) {
                if (!is_array($item)) {
                    continue;
                }

                $languageId = $this->resolveLanguageId($item, $validLanguageIds);

                if ($languageId === null && is_numeric($key)) {
                    $keyAsId = (int) $key;
                    if (in_array($keyAsId, $validLanguageIds, true)) {
                        $languageId = $keyAsId;
                    }
                }

                if ($languageId === null) {
                    continue;
                }

                $normalized[(string) $languageId] = array_merge($item, ['language_id' => $languageId]);
            }

            if (!empty($normalized)) {
                $this->merge(['languages' => $normalized]);
            }

            return;
        }

        $normalized = [];

        foreach ($languages as $item) {
            if (!is_array($item)) {
                continue;
            }

            $languageId = $this->resolveLanguageId($item, $validLanguageIds);
            if ($languageId === null) {
                continue;
            }

            $normalized[(string) $languageId] = array_merge($item, ['language_id' => $languageId]);
        }

        if (!empty($normalized)) {
            $this->merge(['languages' => $normalized]);
        }
    }

    private function resolveLanguageId(array $item, array $validLanguageIds): ?int
    {
        if (isset($item['language_id']) && in_array((int) $item['language_id'], $validLanguageIds, true)) {
            return (int) $item['language_id'];
        }

        if (
            isset($item['language']['id']) &&
            in_array((int) $item['language']['id'], $validLanguageIds, true)
        ) {
            return (int) $item['language']['id'];
        }

        if (isset($item['id']) && in_array((int) $item['id'], $validLanguageIds, true)) {
            return (int) $item['id'];
        }

        return null;
    }
}
