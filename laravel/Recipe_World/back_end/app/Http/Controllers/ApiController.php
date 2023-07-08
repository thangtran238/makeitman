<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use App\Models\Category;
use App\Models\Obtainer;
use App\Models\Post;
use App\Models\Comment;

class ApiController extends Controller
{

    // Get all obtainer
    public function getAllObtainer()
    {
        $allObtainers = Obtainer::all();
        return response()->json($allObtainers);
    }


    // Get obtainer by obtainer id
    public function getObtainerById($id)
    {
        // $obtainer = DB::table('Obtainers')->where('id', $id)->first();
        $obtainerById = Obtainer::find($id);

        if ($obtainerById) {
            // Fetch the latest data by the created_at column
            $obtainerById = Obtainer::latest()->find($id);

            return response()->json($obtainerById);
        } else {
            return response()->json(['error' => 'Obtainer not found'], 404);
        }
    }





    // Get all posts
    public function getAllPost()
    {
        $posts = Post::with('obtainer', 'category')
            ->get();

        return response()->json($posts);
    }

    public function getNewestPost()
    {


        $posts = Post::with('obtainer', 'category', 'comments')
            ->orderBy('posts.created_at', 'desc')
            ->get();
        $comments = Comment::with('obtainer')->get();

        return response()->json([$posts, $comments]);
    }
    public function getPostById($id)
    {
        $posts = Post::with('obtainer', 'category')
            ->where('id', $id)
            ->get();

        return response()->json($posts);
    }
    public function getPostsForHomePage()
    {
        $posts = Post::with('obtainer', 'category')
            ->inRandomOrder()
            ->take(6)
            ->get();

        return response()->json($posts);
    }



    // Get all posts by obtainer_id
    public function getPostByObtainerId($id)
    {
        $postByObtainerId = Post::where('obtainer_id', $id)->get();

        if ($postByObtainerId->isNotEmpty()) {
            return response()->json($postByObtainerId->toArray());
        } else {
            return response()->json(['error' => 'This user has no posts'], 404);
        }
    }


    // Get all posts posts by category_id
    public function getPostByCategoryId($id)
    {
        $postByCategoryId = Post::all()->where('category_id', $id);

        if ($postByCategoryId) {
            return response()->json($postByCategoryId);
        } else {
            return response()->json(['error' => `This category hasn't any posts`], 404);
        }
    }
    public function getAllOrder()
    {
        $orders = Order::with(['sender', 'recipient', 'post'])->get();
        return response()->json($orders);
    }


    public function getOrderById($id)
    {

        $orders = Order::join('posts', 'posts.id', '=', 'orders.post_id')
            ->select('orders.*', 'posts.*')
            ->where('sender_id', $id)
            ->get();

        return response()->json($orders);
    }

    public function getPostMostComment()
    {
        $posts = Post::select(
            'posts.id',
            'posts.name',
            'posts.obtainer_id',
            'posts.price',
            'posts.description',
            'posts.thumbnail',
            'posts.created_at',

            'obtainers.full_name',
            'obtainers.profile_image_url',
            DB::raw('count(comments.id) as count_comment')
        )
            ->join('comments', 'posts.id', '=', 'comments.post_id')
            ->join('obtainers', 'posts.obtainer_id', '=', 'obtainers.id')
            ->groupBy('posts.id', 'posts.name', 'posts.obtainer_id', 'posts.price', 'posts.description', 'posts.thumbnail', 'posts.created_at', 'obtainers.full_name', 'obtainers.profile_image_url')
            ->orderBy('count_comment', 'desc')
            ->get();

        return response()->json($posts);
    }

    public function getPostsWithCategory()
    {
        $result = DB::table('categories')
            ->select('categories.id', 'categories.name', DB::raw('count(posts.id) as totalPosts'))
            ->join('posts', 'categories.id', '=', 'posts.category_id')
            ->groupBy('categories.id', 'categories.name')
            ->get();
        return response()->json($result);
    }
}
