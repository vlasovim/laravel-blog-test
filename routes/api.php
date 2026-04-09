<?php

use App\Http\Controllers\Api\ArticleController;
use App\Http\Controllers\Api\CommentController;
use Illuminate\Support\Facades\Route;

Route::apiResource('articles', ArticleController::class)->only(['index', 'store', 'show']);
Route::post('articles/{article}/comments', [CommentController::class, 'store']);