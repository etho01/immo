<?php

namespace Database\Factories;

use App\Models\Appart;
use App\Models\Locataire;
use App\Models\Proprietaire;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Contrat>
 */
class ContratFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'appart_id' => Appart::all()->random()->id,
            'locataire_id' => Locataire::all()->random()->id,
            'date_debut' => fake()->date(),
            'date_fin' => fake()->date(),
        ];
    }
}
