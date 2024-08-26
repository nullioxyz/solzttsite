<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContactReference extends Model
{
    protected $table = 'contact_reference';
    
    public function referenceable()
    {
        return $this->morphTo();
    }

    public function contact()
    {
        return $this->belongsTo(Contact::class);
    }
}