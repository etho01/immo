<?php

use App\Models\Appart;
use App\Models\Locataire;
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
        Schema::create('contrats', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Appart::class)->constrained();
            $table->foreignIdFor(Locataire::class)->constrained();
            $table->date('date_debut');
            $table->date('date_fin')->nullable();
            $table->text('ref');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contrats');
    }
};
