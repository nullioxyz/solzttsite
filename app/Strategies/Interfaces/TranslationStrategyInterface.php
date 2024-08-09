<?php

namespace App\Strategies\Interfaces;


/**
 * @template TModel of \Illuminate\Database\Eloquent\Model
 */
interface TranslationStrategyInterface {
    
    /**
     * @param array $languages
     * @param TModel $model
     * @return mixed
     */
    public function create(array $languages, $model);

    /**
     * @param array $languages
     * @param TModel $model
     * @return mixed
     */

     /**
     * @param array $languages
     * @param integer $id
     * @return mixed
     */
    public function update(array $languages, int $id);

    /**
     * @param array $languages
     * @param TModel $model
     * @return mixed
     */
    public function decideCreateOrUpdate(array $languages, $model);

    /**
     * @param integer $id
     * @return mixed
     */
    public function destroy($id);
}
