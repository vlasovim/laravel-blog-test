<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCommentRequest;
use App\Http\Resources\CommentResource;
use App\Models\Article;

class CommentController extends Controller
{
    public function store(StoreCommentRequest $request, Article $article): CommentResource
    {
        $comment = $article->comments()->create($request->validated());

        return new CommentResource($comment);
    }
}