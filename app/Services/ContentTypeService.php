<?php

namespace App\Services;

class ContentTypeService {

    public static function formatedTypes($contentTypes)
    {
        $formatedTypes = [];
        foreach ($contentTypes as $type) {
            $formatedTypes[] = [
                'label' => $type->name,
                'value' => $type->id
            ];
        }

        return $formatedTypes;
    }
}