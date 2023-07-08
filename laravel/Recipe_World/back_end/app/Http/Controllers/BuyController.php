<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\Order;
use Illuminate\Support\Facades\DB;

use Illuminate\Http\Request;

class BuyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($id)
    {
        $orders = Order::with(['sender', 'recipient', 'post'])
            ->where('sender_id', $id)
            ->get();

        return response()->json($orders);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'sender_id' => 'required',
            'recipient_id' => 'required',
            'post_id' => 'required',
            'status' => 'required',
        ]);

        $order = Order::create($validatedData);

        return response()->json($order, 201);
    }

    public function update(Request $request, $id)
    {
        $order = Order::find($id);
        if (!$order) {
            return response()->json(['error' => 'Order not found'], 404);
        }

        $order->status = $request->status;

        $order->save();

        return response()->json($order);
    }


    public function find(Request $request)
    {
        $senderId = $request->sender_id;
        $postId = $request->post_id;

        $orders = Order::where('sender_id', $senderId)
            ->where('post_id', $postId)
            ->get();

        return response()->json( $orders);
    }
    /**
     * Display the specified resource.
     */
}
