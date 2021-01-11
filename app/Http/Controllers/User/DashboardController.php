<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
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
        $totalExpensesNumber = Expense::count();
        $totalEntriesNumber = Entry::count();
        $totalClaimsNumber = Claim::count();
        $totalDebtsNumber = Debt::count();
        
        $financeTrackerData = [];
        $days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        $dayOfWeek = Carbon::today()->dayOfWeek;
        if ($dayOfWeek > 0) {
            for ($i = 1; $i <= $dayOfWeek; $i++) {
                $subDays = $dayOfWeek - $i;
                $data = [];
                foreach (Support::all() as $support) {
                    foreach ($support->currencies as $currency) {
                        $result = 0;

                        foreach (Expense::whereDate('date', Carbon::today()->subDays($subDays))->get() as $transaction) {
                            $result -= $transaction->amount;
                        }

                        foreach (Entry::whereDate('date', Carbon::today()->subDays($subDays))->get() as $transaction) {
                            $result -= $transaction->amount;
                        }

                        foreach (Claim::whereDate('date', Carbon::today()->subDays($subDays))->get() as $transaction) {
                            $result -= $transaction->amount;
                        }

                        foreach (Debt::whereDate('date', Carbon::today()->subDays($subDays))->get() as $transaction) {
                            $result -= $transaction->amount;
                        }

                        foreach (Investment::whereDate('date', Carbon::today()->subDays($subDays))->get() as $transaction) {
                            $result -= $transaction->amount;
                        }

                        $data[$support->slug][$currency->abbr] = $result;
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
                foreach (Support::all() as $support) {
                    foreach ($support->currencies as $currency) {
                        $result = 0;
                        
                        $data[$support->slug][$currency->abbr] = $result;
                    }
                }
                $financeTrackerData[] = ['name' => $days[$day], 'data' => $data];
            }
        } else {
            for ($i = 0; $i < 7; $i++) {
                $subDays = 6 - $i;
                $data = [];
                foreach (Support::all() as $support) {
                    foreach ($support->currencies as $currency) {
                        $result = 0;

                        foreach (Expense::whereDate('date', Carbon::today()->subDays($subDays))->get() as $transaction) {
                            $result -= $transaction->amount;
                        }

                        foreach (Entry::whereDate('date', Carbon::today()->subDays($subDays))->get() as $transaction) {
                            $result -= $transaction->amount;
                        }

                        foreach (Claim::whereDate('date', Carbon::today()->subDays($subDays))->get() as $transaction) {
                            $result -= $transaction->amount;
                        }

                        foreach (Debt::whereDate('date', Carbon::today()->subDays($subDays))->get() as $transaction) {
                            $result -= $transaction->amount;
                        }

                        foreach (Investment::whereDate('date', Carbon::today()->subDays($subDays))->get() as $transaction) {
                            $result -= $transaction->amount;
                        }

                        $data[$support->slug][$currency->abbr] = $result;
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
        ]);
    }
}
