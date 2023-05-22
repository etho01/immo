<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Proprietaire>
 */
class ProprietaireFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'prenom' => rand(0, 1) ? fake()->firstNameMale() : fake()->firstNameFemale(),
            'nom' => fake()->lastName(),
            'date_naissance' => fake()->date(),
            'email' => fake()->email(),
            'telephone' => fake()->phoneNumber(),
            'iban' => fake()->iban(),
            'bic' => fake()->swiftBicNumber(),
            'genre' => rand(0, 1) ? 'homme' : 'femme',
            'ville' => fake()->city(),
            'adresse' => fake()->streetAddress(),
            'cp' => fake()->postcode()
        ];
    }
}
