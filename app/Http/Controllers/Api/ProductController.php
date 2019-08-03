<?php

namespace App\Http\Controllers\Api;

use App\Category;
use App\Product;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
			return response()->json(['errors'=>array(['code'=>422,'message'=>'Faltan datos necesarios para el proceso de alta.(Complete todos los campos)'])],422);
		}
        $newProduct = new Product();
        $this->loadProductData($newProduct,$request);
        return response()->json(['status'=>'ok','data'=>$request], 200);
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
    }
}
