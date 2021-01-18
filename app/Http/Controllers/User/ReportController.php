<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Controllers\UtilController;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    private $rules = [
        'start_date' => 'required|date',
        'end_date' => 'required|date',
        'frequency' => 'required'
    ];

    public function report(Request $request)
    {
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $request->validate($this->rules);

        $from = date($request->start_date);
        $to = date($request->end_date);

        $from_instance = new Carbon($from);
        $to_instance = new Carbon($to);

        if ($from_instance->timestamp > $to_instance->timestamp) return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['report']['start_date'], 'danger'),
        ]);

        $financeTrackerData = [];
        $log = [];

        switch ($request->frequency) {
            case 'daily':
                $timestamp_diff = $to_instance->timestamp - $from_instance->timestamp;

                $days_diff = $timestamp_diff / (24 * 60 * 60);

                for ($i = 0; $i <= $days_diff; $i++) {
                    foreach ($user->supports as $support) {
                        $data[$support->abbr] = [];
                        foreach ($support->currencies as $currency) {
                            $result = 0;
                            $check = false;

                            foreach ($currency->expenses()->where('support_id', $support->id)->whereDate('date', (new Carbon($from))->addDays($i))->get() as $transaction) {
                                $result -= $transaction->amount * $currency->exchange_rate;
                                $check = true;
                            }

                            foreach ($currency->entries()->where('support_id', $support->id)->whereDate('date', (new Carbon($from))->addDays($i))->get() as $transaction) {
                                $result += $transaction->amount * $currency->exchange_rate;
                                $check = true;
                            }

                            foreach ($currency->claims()->where('support_id', $support->id)->whereDate('start_date', (new Carbon($from))->addDays($i))->get() as $transaction) {
                                $result -= $transaction->amount * $currency->exchange_rate;
                                $check = true;
                            }
                            foreach ($currency->claims()->where('support_id', $support->id)->whereDate('end_date', (new Carbon($from))->addDays($i))->get() as $transaction) {
                                $result += $transaction->amount * $currency->exchange_rate;
                                $check = true;
                            }

                            foreach ($currency->debts()->where('support_id', $support->id)->whereDate('start_date', (new Carbon($from))->addDays($i))->get() as $transaction) {
                                $result += $transaction->amount * $currency->exchange_rate;
                                $check = true;
                            }
                            foreach ($currency->debts()->where('support_id', $support->id)->whereDate('end_date', (new Carbon($from))->addDays($i))->get() as $transaction) {
                                $result -= $transaction->amount * $currency->exchange_rate;
                                $check = true;
                            }

                            foreach ($currency->investments()->where('support_id', $support->id)->whereDate('date', (new Carbon($from))->addDays($i))->get() as $transaction) {
                                $result -= $transaction->amount * $currency->exchange_rate;
                                $check = true;
                            }

                            if ($check) $data[$support->abbr][$currency->abbr] = $result;
                        }
                    }
                    $financeTrackerData[] = [
                        'name' => (new Carbon($from))->addDays($i)->format('Y-m-d'),
                        'data' => $data,
                    ];
                }

                break;

            case 'monthly':
                $start_date_month = $from_instance->month;
                $start_date_year = $from_instance->year;

                $end_date_month = $to_instance->month;
                $end_date_year = $to_instance->year;

                $cursor_month = $start_date_month;
                $cursor_year = $start_date_year;

                $are_dates_different = $cursor_year < $end_date_year;
                $are_dates_similar = $cursor_month <= $end_date_month && $cursor_year === $end_date_year;

                while ($are_dates_different || $are_dates_similar) {
                    foreach ($user->supports as $support) {
                        $data[$support->abbr] = [];
                        foreach ($support->currencies as $currency) {
                            $result = 0;
                            $check = false;

                            foreach ($currency->expenses()->where('support_id', $support->id)->whereMonth('date', $cursor_month)->whereYear('date', $cursor_year)->get() as $transaction) {
                                $result -= $transaction->amount * $currency->exchange_rate;
                                $check = true;
                            }

                            foreach ($currency->entries()->where('support_id', $support->id)->whereMonth('date', $cursor_month)->whereYear('date', $cursor_year)->get() as $transaction) {
                                $result += $transaction->amount * $currency->exchange_rate;
                                $check = true;
                            }

                            foreach ($currency->claims()->where('support_id', $support->id)->whereMonth('start_date', $cursor_month)->whereYear('start_date', $cursor_year)->get() as $transaction) {
                                $result -= $transaction->amount * $currency->exchange_rate;
                                $check = true;
                            }
                            foreach ($currency->claims()->where('support_id', $support->id)->whereMonth('end_date', $cursor_month)->whereYear('end_date', $cursor_year)->get() as $transaction) {
                                $result += $transaction->amount * $currency->exchange_rate;
                                $check = true;
                            }

                            foreach ($currency->debts()->where('support_id', $support->id)->whereMonth('start_date', $cursor_month)->whereYear('start_date', $cursor_year)->get() as $transaction) {
                                $result += $transaction->amount * $currency->exchange_rate;
                                $check = true;
                            }
                            foreach ($currency->debts()->where('support_id', $support->id)->whereMonth('end_date', $cursor_month)->whereYear('end_date', $cursor_year)->get() as $transaction) {
                                $result -= $transaction->amount * $currency->exchange_rate;
                                $check = true;
                            }

                            foreach ($currency->investments()->where('support_id', $support->id)->whereMonth('date', $cursor_month)->whereYear('date', $cursor_year)->get() as $transaction) {
                                $result -= $transaction->amount * $currency->exchange_rate;
                                $check = true;
                            }

                            if ($check) $data[$support->abbr][$currency->abbr] = $result;
                        }
                    }
                    $financeTrackerData[] = [
                        'name' => $cursor_year . '-' . ($cursor_month < 10 ? '0' . $cursor_month : $cursor_month),
                        'data' => $data,
                    ];

                    if ($cursor_month === $end_date_month && $cursor_year === $end_date_year) break;

                    if ($cursor_month === 12) {
                        $cursor_year++;
                        $cursor_month = 1;
                    } else $cursor_month++;
                }

                break;

            case 'yearly':
                $start_date_year = $from_instance->year;

                $end_date_year = $to_instance->year;

                $cursor_year = $start_date_year;

                $are_dates_different = $cursor_year <= $end_date_year;

                while ($are_dates_different) {
                    foreach ($user->supports as $support) {
                        $data[$support->abbr] = [];
                        foreach ($support->currencies as $currency) {
                            $result = 0;
                            $check = false;

                            foreach ($currency->expenses()->where('support_id', $support->id)->whereYear('date', $cursor_year)->get() as $transaction) {
                                $result -= $transaction->amount * $currency->exchange_rate;
                                $check = true;
                            }

                            foreach ($currency->entries()->where('support_id', $support->id)->whereYear('date', $cursor_year)->get() as $transaction) {
                                $result += $transaction->amount * $currency->exchange_rate;
                                $check = true;
                            }

                            foreach ($currency->claims()->where('support_id', $support->id)->whereYear('start_date', $cursor_year)->get() as $transaction) {
                                $result -= $transaction->amount * $currency->exchange_rate;
                                $check = true;
                            }
                            foreach ($currency->claims()->where('support_id', $support->id)->whereYear('end_date', $cursor_year)->get() as $transaction) {
                                $result += $transaction->amount * $currency->exchange_rate;
                                $check = true;
                            }

                            foreach ($currency->debts()->where('support_id', $support->id)->whereYear('start_date', $cursor_year)->get() as $transaction) {
                                $result += $transaction->amount * $currency->exchange_rate;
                                $check = true;
                            }
                            foreach ($currency->debts()->where('support_id', $support->id)->whereYear('end_date', $cursor_year)->get() as $transaction) {
                                $result -= $transaction->amount * $currency->exchange_rate;
                                $check = true;
                            }

                            foreach ($currency->investments()->where('support_id', $support->id)->whereYear('date', $cursor_year)->get() as $transaction) {
                                $result -= $transaction->amount * $currency->exchange_rate;
                                $check = true;
                            }

                            if ($check) $data[$support->abbr][$currency->abbr] = $result;
                        }
                    }
                    $financeTrackerData[] = [
                        'name' => $cursor_year,
                        'data' => $data,
                    ];

                    if ($cursor_year === $end_date_year) break;

                    $cursor_year++;
                }

                break;
        }

        $currencies = [];
        foreach ($user->currencies as $currency) {
            $currencies[$currency->abbr] = $currency->toArray();
        }

        return response()->json([
            'financeTrackerData' => $financeTrackerData,
            'currencies' => $currencies,
        ]);
    }
}
