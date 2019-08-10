<?php

namespace App\Http\Controllers\Api;

use App\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CategoryController extends Controller
{
    public function __construct()
    {
        $this->middleware('jwt', ['except' => ['index','show']]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(['status'=>'ok','data'=>Category::all()], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if (!$request->input('category_name') && $request->input('category_name') === null) {
			return response()->json(['errors'=>array(['code'=>422,'message'=>'Compruebe que los campos esten escritos'])],422);
		}
        $newCategory = new Category();
        $newCategory->category_name=$request->input('category_name'); 
        $newCategory->save();
        return response()->json(['status'=>'ok','data'=>$newCategory], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $category = Category::find($id);
        if(!$category) {
            return response()->json(['errors'=>array(['code'=>404,'message'=>'No se encuentra la Categoria (Seleccione una)'])],404);
        }
        return response()->json(['status'=>'ok','data'=>$category],200);
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
        if (!$request->input('category_name') && $request->input('category_name') === null) {
			return response()->json(['errors'=>array(['code'=>422,'message'=>'Compruebe que los campos esten escritos'])],422);
		}
        $category=Category::find($id);
        if(!$category) {
            return response()->json(['errors'=>array(['code'=>404,'message'=>'No se encuentra la categoria (Seleccione una)'])],404);
        }
        $category->category_name=$request->input('category_name');
        $category->save();
        return response()->json(['status'=>'ok','data'=>Category::all()], 200);
    }

    /**Category
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $category = Category::find($id);
        if(!$category) {
            return response()->json(['errors'=>array(['code'=>404,'message'=>'No se encuentra la Categoria (Seleccione una)'])],404);
        }
        $productsOfTheCategory = $category->products;
        if(count($productsOfTheCategory) !== 0) {
            return response()->json(['errors'=>array(['code'=>422,'message'=>'Hay productos ligados a esta categoria'])],422);
        }
        $category->delete();
        
        return response()->json(['code'=>204,'message'=>'Se ha eliminado el categoria correctamente.'],204);
    }
}
