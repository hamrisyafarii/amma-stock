<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('gudangs', function (Blueprint $table) {
            $table->string('satuan')->after('kuantitas');
        });
    }

    public function down()
    {
        Schema::table('gudangs', function (Blueprint $table) {
            $table->dropColumn('satuan');
        });
    }
};
