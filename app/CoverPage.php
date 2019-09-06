<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CoverPage extends Model
{
    protected $table = 'coverPages';
    protected $fillable = ['image_url', 'image_id'];
    protected $hidden = ['created_at','updated_at'];
}
