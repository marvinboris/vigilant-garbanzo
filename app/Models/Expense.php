<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Expense extends Model
{
    use HasFactory;

    protected $fillable = [
        'support_id', 'currency_id', 'date', 'amount', 'comment',
    ];

    public function support()
    {
        return $this->belongsTo('App\Models\Support');
    }

    public function currency()
    {
        return $this->belongsTo('App\Models\Currency');
    }
}
