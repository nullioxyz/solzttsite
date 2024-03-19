<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Institucional;
use App\Models\Language;
use App\Models\ContentType;
use Illuminate\Foundation\Testing\RefreshDatabase;
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

    }

    public function test_email_verification_status_is_unchanged_when_the_email_address_is_unchanged(): void
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->patch('/justiceroom/profile', [
                'name' => 'Test User',
                'email' => $user->email,
            ]);

        $response
            ->assertSessionHasNoErrors()
            ->assertRedirect('/justiceroom/profile');

        $this->assertNotNull($user->refresh()->email_verified_at);
    }

    public function test_user_can_delete_their_account(): void
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->delete('/justiceroom/profile', [
                'password' => 'password',
            ]);

        $response
            ->assertSessionHasNoErrors()
            ->assertRedirect('/');

        $this->assertGuest();
        $this->assertNull($user->fresh());
    }

    public function test_correct_password_must_be_provided_to_delete_account(): void
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->from('/justiceroom/profile')
            ->delete('/justiceroom/profile', [
                'password' => 'wrong-password',
            ]);

        $response
            ->assertSessionHasErrors('password')
            ->assertRedirect('/justiceroom/profile');

        $this->assertNotNull($user->fresh());
    }
}
