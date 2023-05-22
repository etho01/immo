<?php

use App\Models\Agence;
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
        Schema::create('apparts', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Agence::class)->constrained();
            $table->string('adresse');
            $table->string('adresse_compl')->nullable();
            $table->string('cp');
            $table->string('ville');
            $table->string('departement');
            $table->string('pays');
            $table->decimal('charge');
            $table->decimal('loyer');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('apparts');
    }
};
