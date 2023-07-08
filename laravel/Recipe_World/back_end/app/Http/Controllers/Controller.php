<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use App\Models\Category;
use Illuminate\Http\Request;

class Controller extends BaseController
{
    public function getCategories()
    {
        $categories = Category::all();
        return response()->json($categories);
    }
    public function addCategories(Request $request)
    {
        $categoryName = $request->input('name');
        $check = Category::where('name', $categoryName)->first();
        if ($check) {
            return response()->json(['message' => 'Your category has already existed', 409]);
        } else {
            $categoryName = $request->input('name');
            $category = new Category;
            $category->name = $categoryName;
            $category->save();
            return response()->json(['message' => 'Successful', 200]);
        }
    }
}
