<?php namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Http\Requests\Site\StoreContactRequest;
use App\Services\ContactService;
use Illuminate\Support\Facades\Log;

class ContactController extends Controller
{
    protected $contactService;

    public function __construct(ContactService $contactService)
    {
        $this->contactService = $contactService;
    }

    public function store(StoreContactRequest $request)
    {
        $validatedData = $request->validated();

        if (!$this->contactService->verifyRecaptcha($request->input('recaptcha'), $request->ip())) {
            return back()->withErrors(['captcha' => __('ReCAPTCHA validation failed, please try again')]);
        }

        try {
            
            $this->contactService->storeContact($validatedData);

            return redirect()->route('home.index', $request->cookie('locale'));
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return redirect()->route('home.index')->withErrors(['error' => 'Something went wrong. Please try again.']);
        }
    }
}