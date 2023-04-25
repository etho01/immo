<?php

namespace Database\Factories;

use App\Models\Agence;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Appart>
 */
class AppartFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'agence_id' => Agence::all()->random()->id,
            'adresse' => fake()->streetAddress(),
            'adresse_compl' => '',
            'cp' => fake()->postcode(),
            'departement' => fake()->state(),
            'pays' => fake()->country(),
            'charge' => fake()->randomFloat(2,0,500),
            'loyer' => fake()->randomFloat(2,0,500),
        ];
    }
}
