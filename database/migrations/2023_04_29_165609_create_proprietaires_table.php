<?php

use App\Models\Appart;
use App\Models\Proprietaire;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('proprietaires', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->string('prenom');
            $table->date('date_naissance');
            $table->string('email');
            $table->string('telephone');
            $table->string('iban');
            $table->string('bic');
            $table->enum('genre', ['homme', 'femme']);
            $table->timestamps();
        });
        Schema::table('apparts', function (Blueprint $table) {
            $table->foreignIdFor(Proprietaire::class)->constrained();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('apparts', function(Blueprint $table) {
            $table->dropColumn('proprietaire_id');
        });
        Schema::dropIfExists('proprietaires');
    }
};
