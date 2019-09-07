<?php

namespace App\Http\Controllers\Api;

use App\Category;
use App\Product;
use DB;
use Cloudder;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ProductController extends Controller
{
    public function __construct()
    {
        $this->middleware('jwt', ['except' => ['show','showByCategory','searchByCode','productsOffer','thereIsAOffer']]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if ($this->checkIfTheDataIsValid($request)){
			return response()->json(['error'=>'Faltan datos necesarios para el proceso de alta.(Complete todos los campos)'],422);
        }
        if ($request->input('offer') && !($request->input('offer_title') || $request->input('offer_price'))) {
            return response()->json(['error'=>'Falta un titulo a la Promocion o un Precio Nuevo'],422);
        }
        $products=DB::table('products')->select('code')->where('code', $request->input('code'))->get();
        if (count($products) != 0) {
            return response()->json(['error'=>'Ya existe un Producto con ese Codigo.'],422);
        }
        $newProduct = new Product();
        $cloudder = Cloudder::upload($request->input('image_url'));
        $uploadResult = $cloudder->getResult();
        $newProduct->image_url=$uploadResult['url'];
        $newProduct->image_id=$uploadResult['public_id'];
        $newProduct = $this->loadProductData($newProduct,$request);
        return response()->json(['status'=>'ok','data'=>$newProduct], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $product = Product::find($id);
        if(!$product) {
            return response()->json(['error'=>'No se encuentra un producto con ese código.'],422);
        }
        return response()->json(['status'=>'ok','data'=>$product],200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  string  $category
     * @return \Illuminate\Http\Response
     */
    public function showByCategory($category_id) {
        $category=Category::find($category_id);
        if(!$category) {
            return response()->json(['error'=>'No se encuentra una categoria con ese código.'],422);
        }
        $products=DB::table('products')
                        ->select('products.id','offer','offer_title','offer_price','priority','image_url','code','title','waist','description','price','category_name', 'category_id')
                            ->join('categories', 'categories.id', '=', 'products.category_id')
                                ->where('products.category_id', '=', $category_id)
                                    ->orderBy('priority','asc')
                                        ->get();

        return response()->json(['status'=>'ok','data'=>$products], 200);
    }

    public function searchByCode($code) {
        $products=DB::table('products')
                        ->select('products.id','offer','offer_title','offer_price','priority','image_url','code','title','waist','description','price','category_name', 'category_id')
                            ->where('code', $code)
                                ->join('categories', 'categories.id', '=', 'products.category_id')
                                        ->orderBy('priority','asc')
                                            ->get();
        if(count($products) == 0) {
            return response()->json(['error'=>'No se encontro ningun producto con ese codigo'],422);
        }
        return response()->json(['status'=>'ok','data'=>$products], 200);
    }

    public function productsOffer() {
        $products=DB::table('products')
                        ->select('products.id','offer','offer_title','offer_price','priority','image_url','code','title','waist','description','price','category_name', 'category_id')
                            ->where('offer', 1)
                                ->join('categories', 'categories.id', '=', 'products.category_id')
                                        ->orderBy('priority','asc')
                                            ->get();
        return response()->json(['status'=>'ok','data'=>$products], 200);
    }

    public function thereIsAOffer() {
        $product=DB::table('products')
                        ->limit(1)
                            ->where('offer', 1)
                                ->get();
        return response()->json(['status'=>'ok','data'=>count($product) > 0], 200);
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
        $product = Product::find($id);
        if(!$product) {
            return response()->json(['error'=>'No se encuentra el producto.(Seleccione uno de la tabla)'],404);
        }
        if($this->checkIfTheDataIsValid($request)) {
            return response()->json(['error'=>'Faltan datos necesarios para el proceso de alta.(Complete todos los campos)'],422);
        }
        if ($request->input('offer') && !($request->input('offer_title') || $request->input('offer_price'))) {
            return response()->json(['error'=>'Falta un titulo a la Promocion o un Precio Nuevo'],422);
        }
        $products=DB::table('products')->select('code')->where('code', $request->input('code'))->where('id','!=',$request->input('id'))->get();
        if (count($products) != 0) {
            return response()->json(['error'=>'Ya existe un Producto con ese Codigo.'],422);
        }
        if($product->image_url !== $request->input('image_url')) {
            Cloudder::destroyImage($product->image_id);
            Cloudder::delete($product->image_id);

            $cloudder = Cloudder::upload($request->input('image_url'));
            $uploadResult = $cloudder->getResult();
            $product->image_url=$uploadResult['url'];
            $product->image_id=$uploadResult['public_id'];
        }
        $product = $this->loadProductData($product, $request);
        return response()->json(['status'=>'ok','data'=>$product], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $product = Product::find($id);
        if(!$product) {
            return response()->json(['error'=>'No se encuentra el producto'],404);
        }
        Cloudder::destroyImage($product->image_id);
        Cloudder::delete($product->image_id);
        $product->delete();
        
        return response()->json(['code'=>204,'message'=>'Se ha eliminado el producto correctamente.'],204);
    }

    private function checkIfTheDataIsValid($request) {
        return (!$request->input('title') || 
                !$request->input('waist') || 
                !$request->input('description') || 
                !$request->input('code') || 
                !$request->input('price') || 
                !$request->input('priority') || 
                !$request->input('category_id') ||
                !$request->input('image_url')
            );
    }

    private function loadProductData($newProduct, $request){
        $newProduct->title=$request->input('title');
        $newProduct->waist=$request->input('waist');
        $newProduct->description=$request->input('description');
        $newProduct->price=$request->input('price');
        $newProduct->priority=$request->input('priority');
        $newProduct->category_id=$request->input('category_id'); 
        $newProduct->code=$request->input('code');
        $newProduct->offer=$request->input('offer');
        $newProduct->offer_title=$request->input('offer_title');
        $newProduct->offer_price=$request->input('offer_price');
        $newProduct->save();
        return $newProduct;
    }
}
