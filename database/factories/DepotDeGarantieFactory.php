<?php

namespace Database\Factories;

use App\Models\Contrat;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\DepotDeGarantie>
 */
class DepotDeGarantieFactory extends Factory
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
            'montant_encaisser' => fake()->randomFloat(2,0,50000),
            'date_encaissement' => fake()->date(),
            'montant_restituer' => fake()->randomFloat(2,0,50000),
            'date_restitution' => fake()->date()
        ];
    }
}
