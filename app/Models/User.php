<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens;

    protected $directory = '/users/';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'photo', 'phone', 'role_id', 'language_id', 'currency_id',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function type()
    {
        return 'user';
    }

    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    public static function generateNewRef()
    {
        $letters = range('A', 'Z');
        $numbers = range(0, 9);
        $chars = array_merge($letters, $numbers);
        $length = count($chars);

        $code = '';

        for ($i = 0; $i < 6; $i++) {
            $index = rand(0, $length - 1);
            $code .= $chars[$index];
        }

        return $code;
    }

    public function getPhotoAttribute($value)
    {
        return $value ? $this->directory . $value : null;
    }

    public function language()
    {
        return $this->belongsTo(Language::class);
    }

    public function claims()
    {
        return $this->hasManyThrough(Claim::class, Support::class);
    }

    public function debts()
    {
        return $this->hasManyThrough(Debt::class, Support::class);
    }

    public function entries()
    {
        return $this->hasManyThrough(Entry::class, Support::class);
    }

    public function expenses()
    {
        return $this->hasManyThrough(Expense::class, Support::class);
    }

    public function investments()
    {
        return $this->hasManyThrough(Investment::class, Support::class);
    }

    public function supports()
    {
        return $this->hasMany(Support::class);
    }

    public function currencies()
    {
        return $this->hasMany(Currency::class);
    }

    public function currency()
    {
        return $this->belongsTo(Currency::class);
    }
}
