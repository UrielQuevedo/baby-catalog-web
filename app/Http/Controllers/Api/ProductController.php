<?php

namespace App\Http\Controllers\Api;

use App\Category;
use App\Product;
use DB;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ProductController extends Controller
{
    public function __construct()
    {
        $this->middleware('jwt', ['except' => ['index','show','showByCategory']]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $products=DB::table('products')
                        ->select('products.id','priority','title','waist','code','description','price', 'category_name', 'category_id')
                            ->join('categories', 'categories.id', '=', 'products.category_id')->get();
        return response()->json(['status'=>'ok','data'=>$products], 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
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
        $newProduct = new Product();
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
        //
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
                        ->select('products.id','priority','code','title','waist','description','price','category_name', 'category_id')
                            ->join('categories', 'categories.id', '=', 'products.category_id')
                                ->where('products.category_id', '=', $category_id)
                                    ->orderBy('priority','asc')
                                        ->get();

        return response()->json(['status'=>'ok','data'=>$products], 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    private function checkIfTheDataIsValid($request) {
        return (!$request->input('title') || !$request->input('waist') || !$request->input('description') || !$request->input('code') || !$request->input('price') || !$request->input('priority') || !$request->input('category_id'));
    }

    private function loadProductData($newProduct, $request){
        $newProduct->title=$request->input('title');
        $newProduct->waist=$request->input('waist');
        $newProduct->description=$request->input('description');
        $newProduct->price=$request->input('price');
        $newProduct->priority=$request->input('priority');
        $newProduct->category_id=$request->input('category_id'); 
        $newProduct->code=$request->input('code');
        $newProduct->save();
        return $newProduct;
    }
}
