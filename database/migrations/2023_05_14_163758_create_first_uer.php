<?php

use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Hash;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        User::create([
            'email' => 'test@test.fr',
            'password' => Hash::make('testtest'),
            'name' => 'testUser'
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
    }
};
