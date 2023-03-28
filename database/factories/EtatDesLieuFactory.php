<?php

namespace Database\Factories;

use App\Models\Appart;
use App\Models\Contrat;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\EtatDesLieu>
 */
class EtatDesLieuFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'contrat_id' => Contrat::all()->random()->id,
            'appart_id' => Appart::all()->random()->id,
            'date' => fake()->date(),
            'commentaire' => fake()->paragraph(),
            'stade' => fake()->randomDigitNotNull()
        ];
    }
}
