<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;

use Mail;
use App\Mail\DemoMail;

class MailController extends Controller
{
    /**
     * Write code on Method
     *
     * @return response()
     */


    public function send(Request $request)
    {
        $e_session = $request->input('e_session');
        $E_token = str_pad(mt_rand(0, 999999), 6, '0', STR_PAD_LEFT);
        $mailData = [
            'title' => 'Your token email verification',
            'E_token' => $E_token
        ];
        try {
            Mail::to($e_session)->send(new DemoMail($mailData));
            return response()->json(['token_sent' => $E_token]);
        } catch (\Throwable $th) {
            return response()->json(['message' => 'Failed to send email'], 500);
        }
    }



    public function comparison(Request $request)
    {
        $verify_token = $request->input('verify_token');
        $token_sent = $request->input('token_sent');

        // $verify_token = Session::get("verify_token");
        // $token_sent = Session::get("token_sent");
        if ($token_sent) {
            if ((string)$token_sent === (string)$verify_token) {
                return response()->json(['message' => 'Successful', "token_sent" => $token_sent, "verify_token" => $verify_token]);
            } else {
                return response()->json(['message' => 'Wrong token', "token_sent" => $token_sent, "verify_token" => $verify_token]);
            }
        }
    }
}
