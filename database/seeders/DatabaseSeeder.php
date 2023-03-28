<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Agence;
use App\Models\Appart;
use App\Models\Contrat;
use App\Models\DepotDeGarantie;
use App\Models\EtatDesLieu;
use App\Models\Locataire;
use App\Models\Paiement;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();
        Agence::factory(1)->create();
        Appart::factory(50)->create();
        Locataire::factory(35)->create();
        Contrat::factory(40)->create();
        DepotDeGarantie::factory(30)->create();
        EtatDesLieu::factory(60)->create();
        Paiement::factory(100)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
