<?php


namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\UsersResource;
use App\Models\Obtainer;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;
use Illuminate\Support\Str;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return new UsersResource(Obtainer::all());
    }

    public function checkUserExist(Request $request)
    {
        $email = $request->input('email');
        // return response()->json(['email' => $email]);

        $user = Obtainer::where("email", $email)->first();

        if ($user == null || $user == "") {
            return response()->json(['exists' => false]);
        } else {
            return response()->json(['exists' => true]);
        }
    }

    public function onLogin(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);
        if ($validator->fails()) {
            return response()->json(['success' => 'Login unsuccessful!'], 401);
        }

        $primary_token = Str::random(80);
        $token = hash('sha256', $primary_token);
        $email = $request->input('email');
        $obtainer = Obtainer::where('email', $request->email)->first();

        if ($obtainer && Hash::check($request->password, $obtainer->password)) {
            if ($email == "bondshino.238@gmail.com") {
                return response()->json(['success' => 1, 'data' => $obtainer, 'token' => 'admin'], 201);
            } else {
                return response()->json(['success' => 1, 'data' => $obtainer, 'token' => $token], 200);
            }
        } else {
            return response()->json(['error' => 'Login unsuccessful!'], 401);
        }
    }





    public function onRegister(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|unique:obtainers',
            'password' => 'required',
            'full_name' => 'required|string',
            'confirm_password' => 'required|same:password',
            'date_of_birth' => 'required|date',
            'profile_image_url' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }

        $imageName = null;
        if ($request->hasFile('profile_image_url')) {
            $image = $request->file('profile_image_url');
            $imageName = $image->getClientOriginalName();
            $destinationPath = public_path('/upload/images');
            $imagePath = $destinationPath . '/' . $imageName;
            $image->move($destinationPath, $imageName);
        }

        $imagePath = $imageName;
        try {
            $user = Obtainer::create([
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'full_name' => $request->full_name,
                'date_of_birth' => $request->date_of_birth,
                'profile_image_url' => $imagePath,

            ]);
        } catch (\Illuminate\Database\QueryException $ex) {
            return response()->json(['error' => $ex->getMessage()], 500);
        }
        return response()->json(['success' => 1, 'data' => $user, 'imagePath' => $imagePath], 200);
    }


    public function onLogout()
    {
        session()->forget('token');
        session()->forget('obtainer_id');
        return redirect('http://localhost:3000/login');
    }

    public function onEdit(Request $request, $id)
    {
        $user = Obtainer::find($id);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $user->full_name = $request->input('full_name');
        $user->date_of_birth = $request->input('date_of_birth');
        $user->phone_number = $request->input('phone_number');
        $user->bio = $request->input('bio');
        $user->location = $request->input('location');
        $user->website = $request->input('website');
        $user->updated_at = Carbon::now();
        $user->save();

        return response()->json(['message' => 'User updated successfully'], 200);
    }
}
