<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Controllers\UtilController;
use App\Models\Entry;
use App\Models\Support;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

class EntryController extends Controller
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
        $filteredData = $user->entries()->latest();

        $filteredData = $filteredData
            ->join('currencies', 'currencies.id', '=', 'entries.currency_id')
            ->select('entries.*')
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

        foreach ($filteredData as $entry) {
            $data[] = array_merge($entry->toArray(), [
                'support' => $entry->support->name,
                'currency' => $entry->currency->name,
            ]);
        }

        return [
            'entries' => $data,
            'total' => $total,
        ];
    }



    public function  index()
    {
        $data = $this->data();

        $entries = $data['entries'];
        $total = $data['total'];

        return response()->json([
            'entries' => $entries,
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

        $entry = $user->entries()->find($id);
        if (!$entry) return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['entries']['not_found'], 'danger'),
        ]);

        $entry = $entry->toArray();

        $supports = [];
        foreach ($user->supports as $support) {
            $supports[] = $support->toArray() + [
                'currencies' => $support->currencies,
            ];
        }

        return response()->json([
            'entry' => $entry,
            'supports' => $supports,
        ]);
    }

    public function store(Request $request)
    {
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $request->validate($this->rules);

        $input = $request->all();

        $user->entries()->create($input);

        return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['entries']['created'], 'success'),
        ]);
    }

    public function update(Request $request, $id)
    {
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $entry = $user->entries()->find($id);
        if (!$entry) return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['entries']['not_found'], 'danger'),
        ]);

        $request->validate($this->rules);

        $input = $request->all();

        $entry->update($input);

        return response()->json([
            'message' => [
                'type' => 'success',
                'content' => $cms['pages'][$user->language->abbr]['messages']['entries']['updated']
            ],
        ]);
    }

    public function destroy($id)
    {
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $entry = $user->entries()->find($id);
        if (!$entry) return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['entries']['not_found'], 'danger'),
        ]);

        $entry->delete();

        $data = $this->data();

        $entries = $data['entries'];
        $total = $data['total'];

        return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['entries']['deleted'], 'success'),
            'entries' => $entries,
            'total' => $total,
        ]);
    }
}
