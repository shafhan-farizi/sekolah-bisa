<?php
namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Relations\HasMany;

class User extends Authenticatable
{
    protected $guarded = ['id'];
    protected $hidden = ['password'];

    public function students(): HasMany
    {
        return $this->hasMany(Student::class);
    }
}