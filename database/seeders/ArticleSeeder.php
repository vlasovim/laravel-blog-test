<?php

namespace Database\Seeders;

use App\Models\Article;
use Illuminate\Database\Seeder;

class ArticleSeeder extends Seeder
{
    public function run(): void
    {
        Article::factory(5)->create()->each(function (Article $article) {
            $article->comments()->createMany(
                \App\Models\Comment::factory(3)->make()->toArray()
            );
        });
    }
}