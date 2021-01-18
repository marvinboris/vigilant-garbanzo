<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Controllers\UtilController;
use App\Models\Claim;
use App\Models\Support;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ClaimController extends Controller
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
        $filteredData = $user->claims()->latest();

        $filteredData = $filteredData
            ->join('currencies', 'currencies.id', '=', 'claims.currency_id')
            ->select('claims.*')
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

        foreach ($filteredData as $claim) {
            $data[] = array_merge($claim->toArray(), [
                'support' => $claim->support->name,
                'currency' => $claim->currency->name,
            ]);
        }

        return [
            'claims' => $data,
            'total' => $total,
        ];
    }



    public function  index()
    {
        $data = $this->data();

        $claims = $data['claims'];
        $total = $data['total'];

        return response()->json([
            'claims' => $claims,
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

        $claim = $user->claims()->find($id);
        if (!$claim) return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['claims']['not_found'], 'danger'),
        ]);

        $claim = $claim->toArray();

        $supports = [];
        foreach ($user->supports as $support) {
            $supports[] = $support->toArray() + [
                'currencies' => $support->currencies,
            ];
        }

        return response()->json([
            'claim' => $claim,
            'supports' => $supports,
        ]);
    }

    public function store(Request $request)
    {
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $request->validate($this->rules);

        $input = $request->all();

        $user->claims()->create($input);

        return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['claims']['created'], 'success'),
        ]);
    }

    public function update(Request $request, $id)
    {
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $claim = $user->claims()->find($id);
        if (!$claim) return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['claims']['not_found'], 'danger'),
        ]);

        $request->validate($this->rules);

        $input = $request->all();

        $claim->update($input);

        return response()->json([
            'message' => [
                'type' => 'success',
                'content' => $cms['pages'][$user->language->abbr]['messages']['claims']['updated']
            ],
        ]);
    }

    public function destroy($id)
    {
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $claim = $user->claims()->find($id);
        if (!$claim) return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['claims']['not_found'], 'danger'),
        ]);

        $claim->delete();

        $data = $this->data();

        $claims = $data['claims'];
        $total = $data['total'];

        return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['claims']['deleted'], 'success'),
            'claims' => $claims,
            'total' => $total,
        ]);
    }
}
