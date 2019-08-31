<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $table = 'products';
    protected $fillable = ['title','offer','title_offer', 'description', 'waist','image_url', 'image_id', 'price','category_id', 'priority', 'code', 'banner_id'];
    protected $hidden = ['created_at','updated_at'];
    public function category()
	{
		return $this->belongsTo('App\Category');
    }
    public function banner()
	{
		return $this->belongsTo('App\Banner');
    }
}
