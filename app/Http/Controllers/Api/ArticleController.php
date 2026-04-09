<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreArticleRequest;
use App\Http\Resources\ArticleCollection;
use App\Http\Resources\ArticleResource;
use App\Models\Article;
use Illuminate\Http\JsonResponse;

class ArticleController extends Controller
{
    public function index(): ArticleCollection
    {
        $articles = Article::latest()->get();

        return new ArticleCollection($articles);
    }

    public function store(StoreArticleRequest $request): ArticleResource
    {
        $article = Article::create($request->validated());

        return new ArticleResource($article);
    }

    public function show(Article $article): ArticleResource
    {
        $article->load('comments');

        return new ArticleResource($article);
    }
}