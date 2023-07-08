<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{

    public function index($post_id)
    {
        $comments = Comment::with(['post', 'obtainer'])
            ->where('post_id', $post_id)
            ->get();

        return response()->json($comments);
    }

    // public function getCommentById($comment_id) {
    //     $comments = DB::table('posts')
    //     ->join('comments', 'posts.id', '=', 'comments.post_id')
    //     ->join('obtainers', 'obtainers.id', '=', 'comments.obtainer_id')
    //     ->select('posts.*', 'comments.*', 'obtainers.*')
    //     ->where('comments.id', $comment_id)
    //     ->get();


    // return response()->json($comments);
    // }
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'obtainer_id' => 'required',
            'post_id' => 'required',

            'content' => 'required',
        ]);

        $comment = Comment::create($validatedData);

        return response()->json($comment, 201);
    }

    public function update(Request $request, $id)
    {
        $newComment = $request->input('content');

        $comment = Comment::find($id);

        if ($comment) {
            $comment->update(['content' => $newComment]);
            return response()->json(['message' => 'Comment updated successfully']);
        }

        return response()->json(['message' => 'Comment not found'], 404);
    }

    public function destroy($id)
    {
        $comment = Comment::findOrFail($id);
        $comment->delete();


        return response()->json(['message' => 'Comment deleted successfully']);
    }
}
