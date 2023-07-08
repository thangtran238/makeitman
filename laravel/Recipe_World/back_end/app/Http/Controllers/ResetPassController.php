<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\Obtainer;
use Mail;
use App\Mail\ResetMail;
use Illuminate\Support\Facades\Hash;

class ResetPassController extends Controller
{
    /**
     * Write code on Method
     *
     * @return response()
     */


    public function sendResetPass(Request $request)
    {

        $email = $request->input('email');
        // $emailHashed = Hash::make($email);
        $obtainer = Obtainer::where("email", $email)->first();
        $id = $obtainer ? $obtainer->id : null;

        $id = intval($id) + 666;
        $resetLink = "http://localhost:3000/new-pass?token=" . $id . "&email=" . $email;
        $mailData = [
            'title' => 'Reset password link',
            'email' => $email,
            'resetLink' => $resetLink,
        ];
        try {
            Mail::to($email)->send(new ResetMail($mailData));
            return response()->json(['mailData' => $mailData]);
        } catch (\Throwable $th) {
            return response()->json(['message' => 'Failed to send reset password', 'mailData' => $mailData], 500);
        }
    }

    public function checkObatainerExist(Request $request)
    {
        $email = $request->input('email');
        $check_exist = Obtainer::get()->where('email', $email);
        if ($check_exist->isEmpty()) {
            return response()->json(['message' => 'This email has not register'], 401);
        } else {
            return response()->json(['message' => 'Registered'], 200);
        }
    }


    public function resetPass(Request $request)
    {
        $token = $request->input('token');
        $email = $request->input('email');
        $password = $request->input('password');
        $tokenReal = intval($token) - 666;

        $user = Obtainer::where('id', $tokenReal)->first();
        $emailUser = Obtainer::where('id', $tokenReal)->value('email');


        if ($email == $emailUser) {
            $user->password = Hash::make($password);
            $user->save();
            return response()->json(['message' => 'Password update successful' , 'email user' => $emailUser, "email" =>$email], 200);
        } else {
            return response()->json(['message' => 'User not found. Please try again', 'email user' => $emailUser, "email" =>$email ], 404);
        }
    }
}
