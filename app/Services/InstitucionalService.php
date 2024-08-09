<?php

namespace App\Services;

use App\Strategies\Translation\TranslationStrategyInterface;

class InstitucionalService {
    
    protected $institucionalStrategy;
    protected $institucionalLangStrategy;


    public function __construct(BaseStrategyInterfrace $institucionalStrategy, TranslationStrategyInterface $institucionalLangStrategy)
    {
        $this->institucionalStrategy = $institucionalStrategy;
        $this->institucionalLangStrategy = $institucionalLangStrategy;
    }
}