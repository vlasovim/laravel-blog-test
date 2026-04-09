<?php

namespace Database\Factories;

use App\Models\Article;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Article>
 */
class ArticleFactory extends Factory
{
    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence(6),
            'content' => $this->faker->paragraphs(4, true),
        ];
    }
}