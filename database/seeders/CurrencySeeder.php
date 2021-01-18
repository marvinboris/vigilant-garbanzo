<?php

namespace Database\Seeders;

use App\Models\Currency;
use App\Models\User;
use Illuminate\Database\Seeder;

class CurrencySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $currencies = [
            [
                'user_id' => 1,
                'name' => 'Francs CFA',
                'abbr' => 'XAF',
                'exchange_rate' => 1,
            ],
            [
                'user_id' => 1,
                'name' => 'US Dollars',
                'abbr' => 'USD',
                'exchange_rate' => 540,
            ],
            [
                'user_id' => 1,
                'name' => 'Liyeplimal Money',
                'abbr' => 'LIMO',
                'exchange_rate' => 650
            ],
        ];

        foreach ($currencies as $currency) {
            Currency::create($currency);
        }

        User::find(1)->update(['currency_id' => 1]);
    }
}
