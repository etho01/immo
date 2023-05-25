<?php

use App\Models\Appart;
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
        Schema::create('etat_des_lieus', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Contrat::class)->nullable();
            $table->foreignIdFor(Appart::class)->constrained();
            $table->date('date');
            $table->text('commentaire');
            $table->integer('stade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('etat_des_lieus');
    }
};
