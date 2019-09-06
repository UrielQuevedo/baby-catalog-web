<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\CoverPage;
use DB;
use Cloudder;

class CoverPageController extends Controller
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
        $coverPages = CoverPage::All();
        if(count($coverPages) == 0) {
            return response()->json(['status'=>'ok', 'data'=>''], 200); 
        }
        $coverPage = $coverPages[0];
        return response()->json(['status'=>'ok', 'data'=>$coverPage], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $coverPages = CoverPage::all();
        if(count($coverPages) >= 1) {
            return response()->json(['status'=>'error', 'data'=>'Ya existe una foto de portada'], 200); 
        }
        if (!$request->input('image_url')){
			return response()->json(['error'=>'Faltan datos necesarios para el proceso de alta.(Complete todos los campos)'],422);
        }
        $newCoverPage = new CoverPage();
        $cloudder = Cloudder::upload($request->input('image_url'));
        $uploadResult = $cloudder->getResult();
        $newCoverPage->image_url=$uploadResult['url'];
        $newCoverPage->image_id=$uploadResult['public_id'];
        $newCoverPage->save();
        return response()->json(['status'=>'ok','data'=>$newCoverPage], 200);
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
        $coverPage = CoverPage::find($id);
        if(!$coverPage) {
            return response()->json(['error'=>'No se encuentra la imagen de portada.'],404);
        }
        if(!$request->input('image_url')) {
            return response()->json(['error'=>'Faltan datos necesarios para el proceso de alta.(Complete todos los campos)'],422);
        }
        if($coverPage->image_url !== $request->input('image_url')) {
            Cloudder::destroyImage($coverPage->image_id);
            Cloudder::delete($coverPage->image_id);

            $cloudder = Cloudder::upload($request->input('image_url'));
            $uploadResult = $cloudder->getResult();
            $coverPage->image_url=$uploadResult['url'];
            $coverPage->image_id=$uploadResult['public_id'];
            $coverPage->save();
        }
        return response()->json(['status'=>'ok','data'=>$coverPage], 200);
    }
}
