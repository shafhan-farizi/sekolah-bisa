<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Teacher extends Model
{
    protected $guarded = [];

    /**
     * Relasi ke siswa yang dibimbing (Wali Kelas -> Banyak Siswa).
     */
    public function students(): HasMany
    {
        return $this->hasMany(Student::class);
    }
}