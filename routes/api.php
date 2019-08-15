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
Route::resource('category','Api\CategoryController', ['only' => ['index', 'store', 'show', 'update', 'destroy']]);
Route::resource('product','Api\ProductController', ['only' => ['store', 'index', 'update', 'destroy', 'show']]);
Route::resource('banner','Api\BannerController',['only' => ['store','index','update','addProduct']]);

Route::group([
    'prefix' => 'auth',
], function () {
    Route::post('login', 'AuthController@login');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');
});

