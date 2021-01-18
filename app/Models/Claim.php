<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Claim extends Model
{
    use HasFactory;

    protected $fillable = [
        'support_id', 'currency_id', 'start_date', 'end_date', 'amount', 'comment',
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
