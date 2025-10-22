<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Job extends Model
{
    use HasFactory, HasUuids;

    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'title',
        'department',
        'company',
        'location',
        'urgent',
        'date_posted',
        'expiration_date',
        'experience',
        'gender',
        'requirements',
        'salary',
        'description',
    ];

    protected $casts = [
        'urgent' => 'boolean',
        'date_posted' => 'date',
        'expiration_date' => 'date',
        'requirements' => 'array',
    ];

    public function applications()
    {
        return $this->hasMany(Application::class);
    }
}
