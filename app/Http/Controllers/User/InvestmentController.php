<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Controllers\UtilController;
use App\Models\Investment;
use App\Models\Support;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

class InvestmentController extends Controller
{
    private $rules = [
        'date' => 'required|date',
        'delay' => 'required|integer',
        'amount' => 'required|numeric',
        'rate' => 'required|numeric',
        'comment' => 'nullable|string',
        'support_id' => 'required|exists:supports,id',
        'currency_id' => 'required|exists:currencies,id',
    ];

    private function data()
    {
        $user = UtilController::get(request());

        $page = +request()->page;
        $show = request()->show;
        $search = request()->search;

        $total = 0;

        $data = [];
        $filteredData = $user->investments()->latest();

        $filteredData = $filteredData
            ->join('currencies', 'currencies.id', '=', 'investments.currency_id')
            ->select('investments.*')
            ->when($search, function ($query, $search) {
                if ($search !== "")
                    $query
                        ->where('amount', 'LIKE', "%$search%")
                        ->orWhereDate('date', 'LIKE', "%$search%")
                        ->orWhere('delay', 'LIKE', "%$search%")
                        ->orWhere('rate', 'LIKE', "%$search%")
                        ->orWhere('comment', 'LIKE', "%$search%")
                        ->orWhere('currencies.name', 'LIKE', "%$search%")
                        ->orWhere('supports.name', 'LIKE', "%$search%");
            });

        $total = $filteredData->count();

        if ($show !== 'All') $filteredData = $filteredData->skip(($page - 1) * $show)->take($show);

        $filteredData = $filteredData->get();

        foreach ($filteredData as $investment) {
            $data[] = array_merge($investment->toArray(), [
                'support' => $investment->support->name,
                'currency' => $investment->currency->name,
            ]);
        }

        return [
            'investments' => $data,
            'total' => $total,
        ];
    }



    public function  index()
    {
        $data = $this->data();

        $investments = $data['investments'];
        $total = $data['total'];

        return response()->json([
            'investments' => $investments,
            'total' => $total,
        ]);
    }

    public function info()
    {
        $user = UtilController::get(request());

        $supports = [];
        foreach ($user->supports as $support) {
            $supports[] = $support->toArray() + [
                'currencies' => $support->currencies,
            ];
        }

        return response()->json([
            'supports' => $supports,
        ]);
    }

    public function show($id)
    {
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $investment = $user->investments()->find($id);
        if (!$investment) return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['investments']['not_found'], 'danger'),
        ]);

        $investment = $investment->toArray();

        $supports = [];
        foreach ($user->supports as $support) {
            $supports[] = $support->toArray() + [
                'currencies' => $support->currencies,
            ];
        }

        return response()->json([
            'investment' => $investment,
            'supports' => $supports,
        ]);
    }

    public function store(Request $request)
    {
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $request->validate($this->rules);

        $input = $request->all();

        $user->investments()->create($input);

        return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['investments']['created'], 'success'),
        ]);
    }

    public function update(Request $request, $id)
    {
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $investment = $user->investments()->find($id);
        if (!$investment) return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['investments']['not_found'], 'danger'),
        ]);

        $request->validate($this->rules);

        $input = $request->all();

        $investment->update($input);

        return response()->json([
            'message' => [
                'type' => 'success',
                'content' => $cms['pages'][$user->language->abbr]['messages']['investments']['updated']
            ],
        ]);
    }

    public function destroy($id)
    {
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $investment = $user->investments()->find($id);
        if (!$investment) return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['investments']['not_found'], 'danger'),
        ]);

        $investment->delete();

        $data = $this->data();

        $investments = $data['investments'];
        $total = $data['total'];

        return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['investments']['deleted'], 'success'),
            'investments' => $investments,
            'total' => $total,
        ]);
    }
}
