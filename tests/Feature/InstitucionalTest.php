<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Institucional;
use App\Models\Language;
use App\Models\ContentType;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;

use Tests\TestCase;

class InstitucionalTest extends TestCase
{
    use RefreshDatabase;

    public function test_institucional_index(): void
    {
        $user = User::factory()->create();
        $lang = Language::factory()->create();
        $contentType = ContentType::factory()->create();

        $institucional = Institucional::factory()->create([
            'language_id' => $lang->getKey(),
            'content_type_id' => $contentType->getKey(),
            'subtitle' => fake()->name(),
            'description' => fake()->name()
        ]);

        $response = $this
            ->actingAs($user)
            ->get('/justiceroom/institucional');

        $response->assertOk();
    }

    public function test_institucional_store(): void
    {
        $user = User::factory()->create();
        $lang = Language::factory()->create();
        $contentType = ContentType::factory()->create();

        $response = $this
            ->actingAs($user)
            ->post('/justiceroom/institucional/store', [
                'language_id' => $lang->getKey(),
                'content_type_id' => $contentType->getKey(),
                'title' => 'My institucional',
                'subtitle' => 'My subtitle',
                'description' => 'description',
                'slug' => 'my-institucional'
            ]);

        $institucional = Institucional::where('slug', 'my-institucional')->first();
        
        $this->assertEquals($institucional->slug, 'my-institucional');

        $response->assertRedirect('justiceroom/institucional');
        // $response->assertInertia(fn (Assert $page) => $page 
        //     ->has('justiceroom/institucional')

        
        // );
    }
}
