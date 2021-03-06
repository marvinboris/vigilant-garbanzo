<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Currency extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'name', 'abbr', 'exchange_rate'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function supports()
    {
        return $this->belongsToMany(Support::class, 'support_currency')->withPivot(['balance']);
    }

    public function claims()
    {
        return $this->hasMany(Claim::class);
    }

    public function debts()
    {
        return $this->hasMany(Debt::class);
    }

    public function entries()
    {
        return $this->hasMany(Entry::class);
    }

    public function expenses()
    {
        return $this->hasMany(Expense::class);
    }

    public function investments()
    {
        return $this->hasMany(Investment::class);
    }
}
