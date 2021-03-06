<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('/banner/{idBanner}/{idProduct}','Api\BannerController@addProduct');
Route::get('/product/productsOffer','Api\ProductController@productsOffer');
Route::get('/product/thereIsAOffer','Api\ProductController@thereIsAOffer');
Route::put('/banner/{idBanner}/{idProduct}','Api\BannerController@removeProduct');
Route::get('/product/byCategory/{category_id}','Api\ProductController@showByCategory');
Route::get('/product/byCode/{code}','Api\ProductController@searchByCode');
Route::resource('category','Api\CategoryController', ['only' => ['index', 'store', 'show', 'update', 'destroy']]);
Route::resource('coverPage','Api\CoverPageController', ['only' => ['index', 'store', 'update']]);
Route::resource('product','Api\ProductController', ['only' => ['store', 'update', 'destroy', 'show']]);
Route::resource('banner','Api\BannerController',['only' => ['store','index','update']]);


Route::group([
    'prefix' => 'auth',
], function () {
    Route::post('login', 'AuthController@login');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');
});

