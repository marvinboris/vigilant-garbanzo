<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Investment extends Model
{
    use HasFactory;

    protected $fillable = [
        'support_id', 'currency_id', 'date', 'delay', 'amount', 'rate', 'comment',
    ];

    public function support()
    {
        return $this->belongsTo(Support::class);
    }

    public function currency()
    {
        return $this->belongsTo(Currency::class);
    }
}
