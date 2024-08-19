<?php namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Http\Requests\Site\StoreContactRequest;
use App\Models\ContentType;
use App\Repositories\Contact\ContactRepository;
use App\Services\ContactService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;

class ContactController extends Controller
{
    protected $contactRepo;

    public function __construct(ContactRepository $contactRepo)
    {
        $this->contactRepo = $contactRepo;
    }

    public function store(StoreContactRequest $request)
    {
        $validator = $request->validated();


        if (!$validator) {
            return response()->json($validator);
        }
        
        $recaptchaResponse = $request->input('g-recaptcha-response');

        $response = Http::asForm()->post('https://www.google.com/recaptcha/api/siteverify', [
            'secret' => env('G_RECAPCHA'),
            'response' => $recaptchaResponse,
            'remoteip' => $request->ip(),
        ]);

        $body = json_decode((string) $response->getBody());

        if (!$body->success) {
            return back()->withErrors(['captcha' => 'ReCAPTCHA validation failed, please try again.']);
        }

        try {
            DB::beginTransaction();

            $contact = $this->contactRepo->create([
                ...$validator,
                'content_type_id' => ContentType::TATTOO
            ]);

            DB::commit();

            //send admin e-mail
            ContactService::sendEmail(
                $contact,
                __('Contact from website'),
                'emails.contact_to_admin',
                env('MAIL_FROM_ADDRESS')
            );

            ContactService::sendEmail(
                $contact,
                __('Contact from website'),
                'emails.request_confirmation',
            );

            return redirect()->route('site.index');

        } catch (\Exception $e) {
            
            DB::rollBack();
            
            return redirect()->route('site.index');
        }
    }
}