<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Controllers\UtilController;
use App\Models\Debt;
use App\Models\Support;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

class DebtController extends Controller
{
    private $rules = [
        'start_date' => 'required|date',
        'end_date' => 'nullable|date',
        'amount' => 'required|numeric',
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
        $filteredData = $user->debts()->latest();

        $filteredData = $filteredData
            ->join('currencies', 'currencies.id', '=', 'debts.currency_id')
            ->select('debts.*')
            ->when($search, function ($query, $search) {
                if ($search !== "")
                    $query
                        ->where('amount', 'LIKE', "%$search%")
                        ->orWhere('comment', 'LIKE', "%$search%")
                        ->orWhereDate('start_date', 'LIKE', "%$search%")
                        ->orWhereDate('end_date', 'LIKE', "%$search%")
                        ->orWhere('currencies.name', 'LIKE', "%$search%")
                        ->orWhere('supports.name', 'LIKE', "%$search%");
            });

        $total = $filteredData->count();

        if ($show !== 'All') $filteredData = $filteredData->skip(($page - 1) * $show)->take($show);

        $filteredData = $filteredData->get();

        foreach ($filteredData as $debt) {
            $data[] = array_merge($debt->toArray(), [
                'support' => $debt->support->name,
                'currency' => $debt->currency->name,
            ]);
        }

        return [
            'debts' => $data,
            'total' => $total,
        ];
    }



    public function  index()
    {
        $data = $this->data();

        $debts = $data['debts'];
        $total = $data['total'];

        return response()->json([
            'debts' => $debts,
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

        $debt = $user->debts()->find($id);
        if (!$debt) return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['debts']['not_found'], 'danger'),
        ]);

        $debt = $debt->toArray();

        $supports = [];
        foreach ($user->supports as $support) {
            $supports[] = $support->toArray() + [
                'currencies' => $support->currencies,
            ];
        }

        return response()->json([
            'debt' => $debt,
            'supports' => $supports,
        ]);
    }

    public function store(Request $request)
    {
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $request->validate($this->rules);

        $input = $request->all();

        $user->debts()->create($input);

        return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['debts']['created'], 'success'),
        ]);
    }

    public function update(Request $request, $id)
    {
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $debt = $user->debts()->find($id);
        if (!$debt) return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['debts']['not_found'], 'danger'),
        ]);

        $request->validate($this->rules);

        $input = $request->all();

        $debt->update($input);

        return response()->json([
            'message' => [
                'type' => 'success',
                'content' => $cms['pages'][$user->language->abbr]['messages']['debts']['updated']
            ],
        ]);
    }

    public function destroy($id)
    {
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $debt = $user->debts()->find($id);
        if (!$debt) return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['debts']['not_found'], 'danger'),
        ]);

        $debt->delete();

        $data = $this->data();

        $debts = $data['debts'];
        $total = $data['total'];

        return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['debts']['deleted'], 'success'),
            'debts' => $debts,
            'total' => $total,
        ]);
    }
}
