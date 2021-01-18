<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Controllers\UtilController;
use Illuminate\Http\Request;

class CurrencyController extends Controller
{
    private $rules = [
        'name' => 'required|string',
        'abbr' => 'required|string',
        'exchange_rate' => 'required|numeric',
    ];

    private function data()
    {
        $user = UtilController::get(request());

        $page = +request()->page;
        $show = request()->show;
        $search = request()->search;

        $total = 0;

        $data = [];
        $filteredData = $user->currencies()->latest();

        $filteredData = $filteredData
            ->select('currencies.*')
            ->when($search, function ($query, $search) {
                if ($search !== "")
                    $query
                        ->where('name', 'LIKE', "%$search%")
                        ->orWhere('abbr', 'LIKE', "%$search%");
            });

        $total = $filteredData->count();

        if ($show !== 'All') $filteredData = $filteredData->skip(($page - 1) * $show)->take($show);

        $filteredData = $filteredData->get();

        foreach ($filteredData as $currency) {
            $data[] = array_merge($currency->toArray(), []);
        }

        return [
            'currencies' => $data,
            'total' => $total,
        ];
    }



    public function  index()
    {
        $data = $this->data();

        $currencies = $data['currencies'];
        $total = $data['total'];

        return response()->json([
            'currencies' => $currencies,
            'total' => $total,
        ]);
    }

    public function show($id)
    {
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $currency = $user->currencies()->find($id);
        if (!$currency) return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['currencies']['not_found'], 'danger'),
        ]);

        return response()->json([
            'currency' => $currency,
        ]);
    }

    public function store(Request $request)
    {
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $request->validate($this->rules);

        $input = $request->all();

        $user->currencies()->create($input);

        return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['currencies']['created'], 'success'),
        ]);
    }

    public function update(Request $request, $id)
    {
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $currency = $user->currencies()->find($id);
        if (!$currency) return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['currencies']['not_found'], 'danger'),
        ]);

        $request->validate($this->rules);

        $input = $request->all();

        $currency->update($input);

        return response()->json([
            'message' => [
                'type' => 'success',
                'content' => $cms['pages'][$user->language->abbr]['messages']['currencies']['updated']
            ],
        ]);
    }

    public function destroy($id)
    {
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $currency = $user->currencies()->find($id);
        if (!$currency) return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['currencies']['not_found'], 'danger'),
        ]);

        $currency->delete();

        $data = $this->data();

        $currencies = $data['currencies'];
        $total = $data['total'];

        return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['currencies']['deleted'], 'success'),
            'currencies' => $currencies,
            'total' => $total,
        ]);
    }
}
