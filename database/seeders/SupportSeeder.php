<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Support;

class SupportSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $supports = [
            [
                'name' => 'Cash',
                'abbr' => 'Cash',
                'user_id' => 1,
            ],
            [
                'name' => 'Liyeplimal',
                'abbr' => 'Liyeplimal',
                'user_id' => 1,
            ],
            [
                'name' => 'Orange Money',
                'abbr' => 'OM',
                'user_id' => 1,
            ],
            [
                'name' => 'MTN Mobile Money',
                'abbr' => 'MoMo',
                'user_id' => 1,
            ],
            [
                'name' => 'Binance',
                'abbr' => 'Binance',
                'user_id' => 1,
            ],
        ];

        foreach ($supports as $support) {
            Support::create($support);
        }

        Support::find(1)->currencies()->sync([1]);
        Support::find(2)->currencies()->sync([3]);
        Support::find(3)->currencies()->sync([1]);
        Support::find(4)->currencies()->sync([1]);
        Support::find(5)->currencies()->sync([2]);
    }
}
