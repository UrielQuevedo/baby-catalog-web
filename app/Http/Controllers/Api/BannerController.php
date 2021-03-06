<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Banner;
use App\Product;
use DB;

class BannerController extends Controller
{
    public function __construct()
    {
        $this->middleware('jwt', ['except' => ['index']]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $banners = Banner::all();
        if(count($banners) == 0) {
            return response()->json(['status'=>'ok', 'data'=>''], 200); 
        }
        $banner = $banners[0];
        foreach ($banner->products as $product) {
            $product->category;
        }
        return response()->json(['status'=>'ok', 'data'=>$banner], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if(!$request->input('title')){
            return response()->json(['error'=>'Faltan datos necesarios para el proceso de alta.'],422);
        }
        if(count(Banner::all()) >= 1){
            return response()->json(['error'=>'Ya existe un Banner, Editelo.'],422);
        }
        $newBanner = new Banner();
        $newBanner->title=$request->input('title');
        $newBanner->save();
        $newBanner->products;
        return response()->json(['status'=>'ok','data'=>$newBanner], 200);;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $banner = Banner::find($id);
        if(!$banner){
            return response()->json(['error'=>'No se encuentra un banner con ese código.'],404);
        }
        if(!$request->input('title')){
            return response()->json(['error'=>'Faltan datos necesarios para el proceso de alta.'],422);
        }
        $banner->title=$request->input('title');
        $banner->save();
        foreach ($banner->products as $product) {
            $product->category;
        }
        return response()->json(['status'=>'ok','data'=>$banner], 200);
    }

    public function addProduct($idBanner, $idProduct)
    {
        $banner = Banner::find($idBanner);
        if(!$banner) {
            return response()->json(['error'=>'No se encuentra un banner con ese código.'],404);
        }
        $product = Product::find($idProduct);
        if(!$product) {
            return response()->json(['error'=>'No se encuentra un producto. (Seleccione uno)'],404);
        }
        $product->banner_id=$idBanner;
        $product->save();
        foreach ($banner->products as $product) {
            $product->category;
        }
        return response()->json(['status'=>'ok', 'data'=>$banner], 200);
    }

    public function removeProduct($idBanner, $idProduct)
    {
        $banner = Banner::find($idBanner);
        if(!$banner) {
            return response()->json(['error'=>'No se encuentra un banner con ese código.'],404);
        }
        $product = Product::find($idProduct);
        if(!$product) {
            return response()->json(['error'=>'No se encuentra un producto. (Seleccione uno)'],404);
        }
        $product->banner_id=null;
        $product->save();
        foreach ($banner->products as $product) {
            $product->category;
        }
        return response()->json(['status'=>'ok', 'data'=>$banner], 200);
    }
}
