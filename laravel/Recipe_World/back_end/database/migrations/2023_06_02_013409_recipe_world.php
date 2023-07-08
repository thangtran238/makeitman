<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        // Create users table
        Schema::create('obtainers', function (Blueprint $table) {
            $table->increments('id');
            $table->string('email')->unique();
            $table->string('password');
            $table->string('full_name');
            $table->date('date_of_birth');
            $table->text('bio')->nullable();
            $table->string('profile_image_url')->nullable();
            $table->string('location')->nullable();
            $table->string('website')->nullable();
            $table->string('phone_number')->nullable();
            $table->boolean('isActive')->default(0);
            $table->unsignedInteger('followers_count')->default(0);
            $table->timestamps();
        });
        // Create categories table
        Schema::create('categories', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->timestamps();
        });

        // Create tags table
        Schema::create('tags', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->timestamps();
        });
        // Create posts table
        Schema::create('posts', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('obtainer_id');
            $table->foreign('obtainer_id')->references('id')->on('obtainers');
            $table->unsignedInteger('category_id')->nullable();
            $table->foreign('category_id')->references('id')->on('categories');
            $table->string('name');
            $table->text('instruction');
            $table->integer('preparetion_time');
            $table->integer('cooking_time');
            $table->text('description');
            $table->text('ingredients');
            $table->string('thumbnail');
            $table->integer('price');
            $table->timestamps();
        });


        // Create post_images table
        Schema::create('post_images', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('post_id');
            $table->foreign('post_id')->references('id')->on('posts');
            $table->string('image_url');
            $table->timestamps();
        });

        // Create post_tag table for many-to-many relationship between posts and tags
        Schema::create('post_tag', function (Blueprint $table) {
            $table->unsignedInteger('post_id');
            $table->foreign('post_id')->references('id')->on('posts')->onDelete('cascade');
            $table->unsignedInteger('tag_id');
            $table->foreign('tag_id')->references('id')->on('tags')->onDelete('cascade');
            $table->primary(['post_id', 'tag_id']);
        });

        // Create comments table
        Schema::create('comments', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('obtainer_id');
            $table->foreign('obtainer_id')->references('id')->on('obtainers');
            $table->unsignedInteger('post_id');
            $table->foreign('post_id')->references('id')->on('posts');
            $table->unsignedInteger('parent_id')->nullable();
            $table->foreign('parent_id')->references('id')->on('comments')->onDelete('cascade');
            $table->text('content');
            $table->timestamps();
        });

        // Create likes table
        Schema::create('likes', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('obtainer_id');
            $table->foreign('obtainer_id')->references('id')->on('obtainers');
            $table->unsignedInteger('post_id');
            $table->foreign('post_id')->references('id')->on('posts');
            $table->boolean('is_like');
            $table->timestamps();
        });

        // Create followers table
        Schema::create('followers', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('obtainer_id');
            $table->foreign('obtainer_id')->references('id')->on('obtainers');
            $table->unsignedInteger('follower_obtainer_id');
            $table->foreign('follower_obtainer_id')->references('id')->on('obtainers');
            $table->timestamps();
        });

        // Create messages table
        Schema::create('messages', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('sender_id');
            $table->foreign('sender_id')->references('id')->on('obtainers');
            $table->unsignedInteger('recipient_id');
            $table->foreign('recipient_id')->references('id')->on('obtainers');
            $table->boolean('content');
            $table->timestamps();
        });



        // Create orders table
        Schema::create('orders', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('sender_id');
            $table->foreign('sender_id')->references('id')->on('obtainers')->onDelete('cascade');
            $table->unsignedInteger('recipient_id');
            $table->foreign('recipient_id')->references('id')->on('obtainers')->onDelete('cascade');
            $table->unsignedInteger('post_id');
            $table->foreign('post_id')->references('id')->on('posts');
            $table->boolean('status');
            $table->timestamps();
        });

        Schema::create('recipes', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('post_id');
            $table->foreign('post_id')->references('id')->on('posts')->onDelete('cascade');
            $table->unsignedInteger('seller_id');
            $table->foreign('seller_id')->references('id')->on('obtainers')->onDelete('cascade');
            $table->string('hidden_post');
            $table->timestamps();
        });
    }

    public function down()
    {
        // Drop tables in reverse order
        Schema::dropIfExists('recipes');
        Schema::dropIfExists('likes');
        Schema::dropIfExists('comments');
        Schema::dropIfExists('post_images');
        Schema::dropIfExists('messages');
        Schema::dropIfExists('post_tag');
        Schema::dropIfExists('tags');
        Schema::dropIfExists('orders');
        Schema::dropIfExists('order_sellers');
        Schema::dropIfExists('order_buyers');
        Schema::dropIfExists('posts');
        Schema::dropIfExists('categories');
        Schema::dropIfExists('followers');
        Schema::dropIfExists('obtainers');
    }
};
