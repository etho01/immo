<?php

namespace Database\Factories;

use App\Models\Contrat;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Paiement>
 */
class PaiementFactory extends Factory
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
            'date_paiement' => fake()->date(),
            'montant_paiement' => fake()->randomFloat(2,0,50000),
            'origine' => fake()->randomDigitNotNull()
        ];
    }
}
