<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Controllers\UtilController;
use App\Models\Claim;
use App\Models\Debt;
use App\Models\Entry;
use App\Models\Expense;
use App\Models\Investment;
use App\Models\Support;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $user = UtilController::get(request());

        $totalExpensesNumber = $user->expenses()->count();
        $totalEntriesNumber = $user->entries()->count();
        $totalClaimsNumber = $user->claims()->count();
        $totalDebtsNumber = $user->debts()->count();

        $totalExpenses = [];
        $totalEntries = [];
        $totalClaims = [];
        $totalDebts = [];
        $totalInvestments = [];

        foreach ($user->expenses()->latest()->limit(5)->get() as $expense) {
            $totalExpenses[] = $expense->toArray() + [
                'support' => $expense->support->abbr,
                'currency' => $expense->currency->abbr,
            ];
        }
        foreach ($user->entries()->latest()->limit(5)->get() as $entry) {
            $totalEntries[] = $entry->toArray() + [
                'support' => $entry->support->abbr,
                'currency' => $entry->currency->abbr,
            ];
        }
        foreach ($user->claims()->latest()->limit(5)->get() as $claim) {
            $totalClaims[] = $claim->toArray() + [
                'support' => $claim->support->abbr,
                'currency' => $claim->currency->abbr,
            ];
        }
        foreach ($user->debts()->latest()->limit(5)->get() as $debt) {
            $totalDebts[] = $debt->toArray() + [
                'support' => $debt->support->abbr,
                'currency' => $debt->currency->abbr,
            ];
        }
        foreach ($user->investments()->latest()->limit(5)->get() as $investment) {
            $totalInvestments[] = $investment->toArray() + [
                'support' => $investment->support->abbr,
                'currency' => $investment->currency->abbr,
            ];
        }

        $currencies = [];
        foreach ($user->currencies as $currency) {
            $currencies[$currency->abbr] = $currency->toArray();
        }

        $financeTrackerData = [];
        $days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        $dayOfWeek = Carbon::today()->dayOfWeek;
        if ($dayOfWeek > 0) {
            for ($i = 1; $i <= $dayOfWeek; $i++) {
                $subDays = $dayOfWeek - $i;
                $data = [];
                foreach ($user->supports as $support) {
                    $data[$support->abbr] = [];
                    foreach ($support->currencies as $currency) {
                        $result = 0;
                        $check = false;

                        foreach ($currency->expenses()->where('support_id', $support->id)->whereDate('date', Carbon::today()->subDays($subDays))->get() as $transaction) {
                            $result -= $transaction->amount * $currency->exchange_rate;
                            $check = true;
                        }

                        foreach ($currency->entries()->where('support_id', $support->id)->whereDate('date', Carbon::today()->subDays($subDays))->get() as $transaction) {
                            $result += $transaction->amount * $currency->exchange_rate;
                            $check = true;
                        }

                        foreach ($currency->claims()->where('support_id', $support->id)->whereDate('start_date', Carbon::today()->subDays($subDays))->get() as $transaction) {
                            $result -= $transaction->amount * $currency->exchange_rate;
                            $check = true;
                        }
                        foreach ($currency->claims()->where('support_id', $support->id)->whereDate('end_date', Carbon::today()->subDays($subDays))->get() as $transaction) {
                            $result += $transaction->amount * $currency->exchange_rate;
                            $check = true;
                        }

                        foreach ($currency->debts()->where('support_id', $support->id)->whereDate('start_date', Carbon::today()->subDays($subDays))->get() as $transaction) {
                            $result += $transaction->amount * $currency->exchange_rate;
                            $check = true;
                        }
                        foreach ($currency->debts()->where('support_id', $support->id)->whereDate('end_date', Carbon::today()->subDays($subDays))->get() as $transaction) {
                            $result -= $transaction->amount * $currency->exchange_rate;
                            $check = true;
                        }

                        foreach ($currency->investments()->where('support_id', $support->id)->whereDate('date', Carbon::today()->subDays($subDays))->get() as $transaction) {
                            $result -= $transaction->amount * $currency->exchange_rate;
                            $check = true;
                        }

                        if ($check) $data[$support->abbr][$currency->abbr] = $result;
                    }
                }
                $financeTrackerData[] = [
                    'name' => $days[$i],
                    'data' => $data,
                ];
            }

            for ($i = $dayOfWeek + 1; $i <= 7; $i++) {
                $day = $i;
                if ($i === 7) $day = 0;
                $data = [];
                foreach ($user->supports as $support) {
                    $data[$support->abbr] = [];
                    foreach ($support->currencies as $currency) {
                        $result = 0;

                        if (array_key_exists($currency->abbr, $financeTrackerData[0]['data'][$support->abbr])) $data[$support->abbr][$currency->abbr] = $result;
                    }
                }
                $financeTrackerData[] = ['name' => $days[$day], 'data' => $data];
            }
        } else {
            for ($i = 0; $i < 7; $i++) {
                $subDays = 6 - $i;
                $data = [];
                foreach ($user->supports as $support) {
                    $data[$support->abbr] = [];
                    foreach ($support->currencies as $currency) {
                        $result = 0;
                        $check = false;

                        foreach ($currency->expenses()->where('support_id', $support->id)->whereDate('date', Carbon::today()->subDays($subDays))->get() as $transaction) {
                            $result -= $transaction->amount * $currency->exchange_rate;
                            $check = true;
                        }

                        foreach ($currency->entries()->where('support_id', $support->id)->whereDate('date', Carbon::today()->subDays($subDays))->get() as $transaction) {
                            $result += $transaction->amount * $currency->exchange_rate;
                            $check = true;
                        }

                        foreach ($currency->claims()->where('support_id', $support->id)->whereDate('start_date', Carbon::today()->subDays($subDays))->get() as $transaction) {
                            $result -= $transaction->amount * $currency->exchange_rate;
                            $check = true;
                        }
                        foreach ($currency->claims()->where('support_id', $support->id)->whereDate('end_date', Carbon::today()->subDays($subDays))->get() as $transaction) {
                            $result += $transaction->amount * $currency->exchange_rate;
                            $check = true;
                        }

                        foreach ($currency->debts()->where('support_id', $support->id)->whereDate('start_date', Carbon::today()->subDays($subDays))->get() as $transaction) {
                            $result += $transaction->amount * $currency->exchange_rate;
                            $check = true;
                        }
                        foreach ($currency->debts()->where('support_id', $support->id)->whereDate('end_date', Carbon::today()->subDays($subDays))->get() as $transaction) {
                            $result -= $transaction->amount * $currency->exchange_rate;
                            $check = true;
                        }

                        foreach ($currency->investments()->where('support_id', $support->id)->whereDate('date', Carbon::today()->subDays($subDays))->get() as $transaction) {
                            $result -= $transaction->amount * $currency->exchange_rate;
                            $check = true;
                        }

                        if ($check) $data[$support->abbr][$currency->abbr] = $result;
                        // $data[$support->abbr][$currency->abbr] = $result;
                    }
                }
                $day = $i;
                if ($subDays === 0) $day = 0;
                $financeTrackerData[] = [
                    'name' => $days[$i],
                    'data' => $data,
                ];
            }
        }

        return response()->json([
            'blocksData' => [
                'totalExpenses' => $totalExpensesNumber,
                'totalEntries' => $totalEntriesNumber,
                'totalClaims' => $totalClaimsNumber,
                'totalDebts' => $totalDebtsNumber,
            ],

            'financeTrackerData' => $financeTrackerData,

            'totalExpenses' => $totalExpenses,
            'totalEntries' => $totalEntries,
            'totalClaims' => $totalClaims,
            'totalDebts' => $totalDebts,
            'totalInvestments' => $totalInvestments,

            'currencies' => $currencies,
        ]);
    }
}
