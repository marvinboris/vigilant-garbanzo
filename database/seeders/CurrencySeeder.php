<?php

namespace Database\Seeders;

use App\Models\Currency;
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
                'name' => 'Francs CFA',
                'abbr' => 'XAF'
            ],
            [
                'name' => 'US Dollars',
                'abbr' => 'USD'
            ],
            [
                'name' => 'Liyeplimal Money',
                'abbr' => 'LIMO'
            ],
        ];

        foreach ($currencies as $currency) {
            Currency::create($currency);
        }
    }
}
