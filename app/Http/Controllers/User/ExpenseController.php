<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Controllers\UtilController;
use App\Models\Expense;
use App\Models\Support;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ExpenseController extends Controller
{
    private $rules = [
        'date' => 'required|date',
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
        $filteredData = $user->expenses()->latest();

        $filteredData = $filteredData
            ->join('currencies', 'currencies.id', '=', 'expenses.currency_id')
            ->select('expenses.*')
            ->when($search, function ($query, $search) {
                if ($search !== "")
                    $query
                        ->where('amount', 'LIKE', "%$search%")
                        ->orWhere('comment', 'LIKE', "%$search%")
                        ->orWhereDate('date', 'LIKE', "%$search%")
                        ->orWhere('currencies.name', 'LIKE', "%$search%")
                        ->orWhere('supports.name', 'LIKE', "%$search%");
            });

        $total = $filteredData->count();

        if ($show !== 'All') $filteredData = $filteredData->skip(($page - 1) * $show)->take($show);

        $filteredData = $filteredData->get();

        foreach ($filteredData as $expense) {
            $data[] = array_merge($expense->toArray(), [
                'support' => $expense->support->name,
                'currency' => $expense->currency->name,
            ]);
        }

        return [
            'expenses' => $data,
            'total' => $total,
        ];
    }



    public function  index()
    {
        $data = $this->data();

        $expenses = $data['expenses'];
        $total = $data['total'];

        return response()->json([
            'expenses' => $expenses,
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

        $expense = $user->expenses()->find($id);
        if (!$expense) return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['expenses']['not_found'], 'danger'),
        ]);

        $expense = $expense->toArray();

        $supports = [];
        foreach ($user->supports as $support) {
            $supports[] = $support->toArray() + [
                'currencies' => $support->currencies,
            ];
        }

        return response()->json([
            'expense' => $expense,
            'supports' => $supports,
        ]);
    }

    public function store(Request $request)
    {
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $request->validate($this->rules);

        $input = $request->all();

        $user->expenses()->create($input);

        return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['expenses']['created'], 'success'),
        ]);
    }

    public function update(Request $request, $id)
    {
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $expense = $user->expenses()->find($id);
        if (!$expense) return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['expenses']['not_found'], 'danger'),
        ]);

        $request->validate($this->rules);

        $input = $request->all();

        $expense->update($input);

        return response()->json([
            'message' => [
                'type' => 'success',
                'content' => $cms['pages'][$user->language->abbr]['messages']['expenses']['updated']
            ],
        ]);
    }

    public function destroy($id)
    {
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $expense = $user->expenses()->find($id);
        if (!$expense) return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['expenses']['not_found'], 'danger'),
        ]);

        $expense->delete();

        $data = $this->data();

        $expenses = $data['expenses'];
        $total = $data['total'];

        return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['expenses']['deleted'], 'success'),
            'expenses' => $expenses,
            'total' => $total,
        ]);
    }
}
