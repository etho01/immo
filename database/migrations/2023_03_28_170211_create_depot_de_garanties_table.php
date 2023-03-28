<?php

use App\Models\Contrat;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('depot_de_garanties', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Contrat::class)->constrained();
            $table->decimal('montant_encaisser');
            $table->date('date_encaissement');
            $table->decimal('montant_restituer');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('depot_de_garanties');
    }
};
