<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Support extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'balance',
    ];

    public function currencies()
    {
        return $this->belongsToMany('App\Models\Currency', 'support_currency');
    }
}
