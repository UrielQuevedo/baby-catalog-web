<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $table = 'products';
    protected $fillable = ['title', 'description', 'waist', 'price','category_id', 'priority', 'code'];
    protected $hidden = ['created_at','updated_at'];
    public function category()
	{
		return $this->belongsTo('App\Category');
	}
}
