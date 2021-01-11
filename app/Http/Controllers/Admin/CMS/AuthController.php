<?php

namespace App\Http\Controllers\Admin\CMS;

use App\Http\Controllers\Controller;
use App\Http\Controllers\UtilController;
use App\Models\Language;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    private $rules = [];

    public function patch(Request $request)
    {
        $jsonString = file_get_contents(base_path('cms.json'));
        $cms = json_decode($jsonString, true);

        $request->validate($this->rules);

        $input = $request->except('_method');

        foreach (Language::get() as $language) {
            $cms['pages'][$language->abbr]['auth'] = $input[$language->abbr]['auth'];
        }

        $contentText = json_encode($cms);
        file_put_contents(base_path('cms.json'), $contentText);

        return response()->json([
            'message' => UtilController::message('Contenu modifié avec succès.', 'success'),
            'cms' => $cms,
        ]);
    }
}
