<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->increments('id');
            $table->string('title')->nullable();
            $table->string('waist')->nullable();
            $table->text('description')->nullable();
            $table->integer('price')->nullable();
            $table->string('image_url')->nullable();
            $table->string('image_id')->nullable();
            $table->boolean('offer')->nullable();
            $table->integer('priority')->nullable(true);
            $table->integer('banner_id')->unsigned()->nullable();
            $table->string('code')->nullable();
            $table->integer('category_id')->unsigned()->nullable();
            $table->foreign('category_id')->references('id')->on('categories');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
}
