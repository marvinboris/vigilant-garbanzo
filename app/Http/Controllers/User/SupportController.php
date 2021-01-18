<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Controllers\UtilController;
use Illuminate\Http\Request;

class SupportController extends Controller
{
    private $rules = [
        'name' => 'required|string',
        'abbr' => 'required|string',
    ];

    private function data()
    {
        $user = UtilController::get(request());

        $page = +request()->page;
        $show = request()->show;
        $search = request()->search;

        $total = 0;

        $data = [];
        $filteredData = $user->supports()->latest();

        $filteredData = $filteredData
            ->select('supports.*')
            ->when($search, function ($query, $search) {
                if ($search !== "")
                    $query
                        ->where('name', 'LIKE', "%$search%")
                        ->orWhere('abbr', 'LIKE', "%$search%");
            });

        $total = $filteredData->count();

        if ($show !== 'All') $filteredData = $filteredData->skip(($page - 1) * $show)->take($show);

        $filteredData = $filteredData->get();

        foreach ($filteredData as $support) {
            $data[] = array_merge($support->toArray(), []);
        }

        return [
            'supports' => $data,
            'total' => $total,
        ];
    }



    public function  index()
    {
        $data = $this->data();

        $supports = $data['supports'];
        $total = $data['total'];

        return response()->json([
            'supports' => $supports,
            'total' => $total,
        ]);
    }

    public function info()
    {
        $user = UtilController::get(request());

        $currencies = [];
        foreach ($user->currencies as $currency) {
            $currencies[] = $currency->toArray();
        }

        return response()->json([
            'currencies' => $currencies,
        ]);
    }

    public function show($id)
    {
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $support = $user->supports()->find($id);
        if (!$support) return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['supports']['not_found'], 'danger'),
        ]);

        $support_currencies = [];
        foreach ($support->currencies as $currency) {
            $support_currencies[] = [
                'id' => $currency->id,
                'balance' => $currency->pivot->balance,
            ];
        }

        $support = $support->toArray();
        $support['currencies'] = $support_currencies;

        $currencies = [];
        foreach ($user->currencies as $currency) {
            $currencies[] = $currency->toArray();
        }

        return response()->json([
            'support' => $support,
            'currencies' => $currencies,
        ]);
    }

    public function store(Request $request)
    {
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $request->validate($this->rules);

        $input = $request->only(['name', 'abbr']);

        $support = $user->supports()->create($input);

        $currencies = [];
        foreach ($request->currencies as $currency_id => $currency) {
            $currencies[$currency_id] = [
                'balance' => $currency['balance'],
            ];
        }

        $support->currencies()->sync($currencies);

        return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['supports']['created'], 'success'),
        ]);
    }

    public function update(Request $request, $id)
    {
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $support = $user->supports()->find($id);
        if (!$support) return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['supports']['not_found'], 'danger'),
        ]);

        $request->validate($this->rules);

        $input = $request->only(['name', 'abbr']);

        $support->update($input);

        $currencies = [];
        foreach ($request->currencies as $currency_id => $currency) {
            $currencies[$currency_id] = [
                'balance' => $currency['balance'],
            ];
        }

        $support->currencies()->sync($currencies);

        return response()->json([
            'message' => [
                'type' => 'success',
                'content' => $cms['pages'][$user->language->abbr]['messages']['supports']['updated']
            ],
        ]);
    }

    public function destroy($id)
    {
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $support = $user->supports()->find($id);
        if (!$support) return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['supports']['not_found'], 'danger'),
        ]);

        $support->delete();

        $data = $this->data();

        $supports = $data['supports'];
        $total = $data['total'];

        return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['supports']['deleted'], 'success'),
            'supports' => $supports,
            'total' => $total,
        ]);
    }
}
