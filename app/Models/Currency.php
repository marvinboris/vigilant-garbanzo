<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Currency extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'abbr',
    ];

    public function supports()
    {
        return $this->belongsToMany('App\Models\Support', 'support_currency');
    }
}
