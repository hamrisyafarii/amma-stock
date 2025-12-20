<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('gudangs', function (Blueprint $table) {
            $table->integer('kuantitas')->nullable()->change();
            $table->string('satuan')->nullable()->change();
        });
    }

    public function down()
    {
        Schema::table('gudangs', function (Blueprint $table) {
            $table->integer('kuantitas')->nullable(false)->change();
            $table->string('satuan')->nullable(false)->change();
        });
    }
};
