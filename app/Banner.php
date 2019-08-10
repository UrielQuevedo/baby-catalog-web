<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Banner extends Model
{
    protected $table = 'banners';
    protected $fillable = ['title'];
    protected $hidden = ['created_at','updated_at'];
    public function products()
	{	
		return $this->hasMany('App\Product');
	}
}
