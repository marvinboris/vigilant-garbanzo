<?php

use App\Http\Controllers\UtilController;
use App\Models\Language;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::namespace('Admin')->prefix('admin')->name('admin.')->group(function () {
    Route::post('login', 'AuthController@login')->name('login');
    Route::post('resend', 'AuthController@resend')->name('resend');
    Route::post('verify', 'AuthController@verify')->name('verify');

    Route::middleware('auth:admin')->group(function () {
        Route::get('dashboard', 'DashboardController@index')->name('dashboard');

        Route::prefix('admins')->name('admins.')->group(function () {
            Route::get('{admin}', 'AdminController@show')->name('show');
        });

        Route::name('cms.')->prefix('cms')->namespace('CMS')->group(function () {
            Route::patch('global', 'GlobalController@patch')->name('global');
            Route::patch('general', 'GeneralController@patch')->name('general');
            Route::patch('components', 'ComponentsController@patch')->name('components');
            Route::patch('frontend', 'FrontendController@patch')->name('frontend');
            Route::patch('backend', 'BackendController@patch')->name('backend');
            Route::patch('auth', 'AuthController@patch')->name('auth');

            Route::name('index')->get('', function () {
                $jsonString = file_get_contents(base_path('cms.json'));
                $cms = json_decode($jsonString, true);

                return response()->json([
                    'cms' => $cms,
                    'languages' => Language::all(),
                ]);
            });
        });

        Route::prefix('claims')->name('claims.')->group(function () {
            Route::get('info', 'ClaimController@info')->name('info');
            Route::get('{claim}', 'ClaimController@show')->name('show');
        });

        Route::prefix('debts')->name('debts.')->group(function () {
            Route::get('info', 'DebtController@info')->name('info');
            Route::get('{debt}', 'DebtController@show')->name('show');
        });

        Route::prefix('entries')->name('entries.')->group(function () {
            Route::get('info', 'EntryController@info')->name('info');
            Route::get('{entry}', 'EntryController@show')->name('show');
        });

        Route::prefix('expenses')->name('expenses.')->group(function () {
            Route::get('info', 'ExpenseController@info')->name('info');
            Route::get('{expense}', 'ExpenseController@show')->name('show');
        });

        Route::prefix('investments')->name('investments.')->group(function () {
            Route::get('info', 'InvestmentController@info')->name('info');
            Route::get('{investment}', 'InvestmentController@show')->name('show');
        });

        Route::prefix('supports')->name('supports.')->group(function () {
            Route::get('info', 'SupportController@info')->name('info');
            Route::get('{support}', 'SupportController@show')->name('show');
        });
    
        Route::prefix('currencies')->name('currencies.')->group(function () {
            Route::get('{currency}', 'CurrencyController@show')->name('show');
        });

        Route::prefix('report')->name('report')->group(function () {
            Route::post('', 'ReportController@report')->name('report');
        });

        Route::prefix('features')->name('features.')->group(function () {
            Route::get('{feature}', 'FeatureController@show')->name('show');
        });

        Route::prefix('languages')->name('languages.')->group(function () {
            Route::get('{language}', 'LanguageController@show')->name('show');
        });

        Route::prefix('roles')->name('roles.')->group(function () {
            Route::get('info', 'RoleController@info')->name('info');
            Route::get('{role}', 'RoleController@show')->name('show');
        });

        Route::prefix('users')->name('users.')->group(function () {
            Route::get('info', 'UserController@info')->name('info');
            Route::get('{user}', 'UserController@show')->name('show');
        });

        Route::apiResources([
            'admins' => 'AdminController',
            'users' => 'UserController',
            'roles' => 'RoleController',
            'features' => 'FeatureController',
            'languages' => 'LanguageController',

            'claims' => 'ClaimController',
            'debts' => 'DebtController',
            'entries' => 'EntryController',
            'expenses' => 'ExpenseController',
            'investments' => 'InvestmentController',
            'supports' => 'SupportController',
            'currencies' => 'CurrencyController',
        ]);
    });
});

Route::namespace('User')->prefix('user')->name('user.')->group(function () {
    Route::post('login', 'AuthController@login')->name('login');
    Route::post('forgot', 'AuthController@forgot')->name('forgot');
    Route::post('reset/{id}/{code}', 'AuthController@reset')->name('reset');

    Route::middleware('auth:api')->group(function () {
        Route::get('dashboard', 'DashboardController@index')->name('dashboard');

        Route::middleware('permission')->group(function () {
            Route::name('cms.')->prefix('cms')->namespace('CMS')->group(function () {
                Route::patch('global', 'GlobalController@patch')->name('global');
                Route::patch('general', 'GeneralController@patch')->name('general');
                Route::patch('components', 'ComponentsController@patch')->name('components');
                Route::patch('frontend', 'FrontendController@patch')->name('frontend');
                Route::patch('backend', 'BackendController@patch')->name('backend');
                Route::patch('auth', 'AuthController@patch')->name('auth');

                Route::name('index')->get('', function () {
                    $jsonString = file_get_contents(base_path('cms.json'));
                    $cms = json_decode($jsonString, true);

                    return response()->json([
                        'cms' => $cms,
                        'languages' => Language::all(),
                    ]);
                });
            });

            Route::prefix('claims')->name('claims.')->group(function () {
                Route::get('info', 'ClaimController@info')->name('info');
                Route::get('{claim}', 'ClaimController@show')->name('show');
            });
    
            Route::prefix('debts')->name('debts.')->group(function () {
                Route::get('info', 'DebtController@info')->name('info');
                Route::get('{debt}', 'DebtController@show')->name('show');
            });
    
            Route::prefix('entries')->name('entries.')->group(function () {
                Route::get('info', 'EntryController@info')->name('info');
                Route::get('{entry}', 'EntryController@show')->name('show');
            });
    
            Route::prefix('expenses')->name('expenses.')->group(function () {
                Route::get('info', 'ExpenseController@info')->name('info');
                Route::get('{expense}', 'ExpenseController@show')->name('show');
            });
    
            Route::prefix('investments')->name('investments.')->group(function () {
                Route::get('info', 'InvestmentController@info')->name('info');
                Route::get('{investment}', 'InvestmentController@show')->name('show');
            });
    
            Route::prefix('supports')->name('supports.')->group(function () {
                Route::get('info', 'SupportController@info')->name('info');
                Route::get('{support}', 'SupportController@show')->name('show');
            });
    
            Route::prefix('currencies')->name('currencies.')->group(function () {
                Route::get('{currency}', 'CurrencyController@show')->name('show');
            });

            Route::prefix('report')->name('report')->group(function () {
                Route::post('', 'ReportController@report')->name('report');
            });

            Route::prefix('features')->name('features.')->group(function () {
                Route::get('{feature}', 'FeatureController@show')->name('show');
            });

            Route::prefix('languages')->name('languages.')->group(function () {
                Route::get('{language}', 'LanguageController@show')->name('show');
            });

            Route::prefix('roles')->name('roles.')->group(function () {
                Route::get('info', 'RoleController@info')->name('info');
                Route::get('{role}', 'RoleController@show')->name('show');
            });

            Route::prefix('users')->name('users.')->group(function () {
                Route::get('info', 'UserController@info')->name('info');
                Route::get('{user}', 'UserController@show')->name('show');
            });

            Route::apiResources([
                'users' => 'UserController',
                'roles' => 'RoleController',
                'features' => 'FeatureController',
                'languages' => 'LanguageController',

                'claims' => 'ClaimController',
                'debts' => 'DebtController',
                'entries' => 'EntryController',
                'expenses' => 'ExpenseController',
                'investments' => 'InvestmentController',
                'supports' => 'SupportController',
                'currencies' => 'CurrencyController',
            ]);
        });
    });
});

Route::middleware('auth:admin,api')->group(function () {
    Route::get('logout', 'UtilController@logout')->name('logout');
    Route::get('user', 'UtilController@user')->name('user');

    Route::prefix('notifications')->name('notifications.')->group(function () {
        Route::get('{notification}', 'UtilController@notification')->name('show');
        Route::get('', 'UtilController@notifications')->name('index');
    });

    Route::name('export.')->prefix('export')->group(function () {
        Route::name('xlsx')->post('xlsx', 'ExportController@xlsx');
        Route::name('csv')->post('csv', 'ExportController@csv');
        Route::name('pdf')->post('pdf', 'ExportController@pdf');
    });

    Route::prefix('content')->name('content.')->group(function () {
        Route::get('language/{language}', function ($id) {
            $user = UtilController::get(request());

            $jsonString = file_get_contents(base_path('cms.json'));
            $cmsFile = json_decode($jsonString, true);

            $language = Language::find($id);
            if (!$language) return response()->json([
                'message' => UtilController::message($cmsFile['pages'][$user->language->abbr]['messages']['languages']['not_found'], 'danger')
            ]);

            $user->update([
                'language_id' => $id
            ]);

            $cms = [
                'global' => $cmsFile['global'],
                'pages' => $cmsFile['pages'][$language->abbr],
            ];

            return response()->json([
                'language' => $language->toArray(),
                'cms' => $cms,
            ]);
        })->name('language');
    });
});

Route::prefix('content')->name('content.')->group(function () {
    Route::get('{language}', function ($lang) {
        $jsonString = file_get_contents(base_path('cms.json'));
        $cmsFile = json_decode($jsonString, true);

        $abbr = $lang;
        if (Language::whereAbbr($lang)->count() === 0) $abbr = env('MIX_DEFAULT_LANG');

        $cms = [
            'global' => $cmsFile['global'],
            'pages' => $cmsFile['pages'][$abbr],
        ];

        return response()->json([
            'cms' => $cms,
        ]);
    })->name('cms');
});
