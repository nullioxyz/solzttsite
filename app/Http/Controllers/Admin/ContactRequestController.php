<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StorePortfolioRequest;
use App\Http\Requests\Admin\UpdateContactRequest;
use App\Http\Requests\Admin\UpdatePortfolioRequest;
use App\Models\Category;
use App\Models\Contact;
use App\Models\ContentType;
use App\Models\Language;
use App\Models\Portfolio;
use App\Models\PortfolioLang;
use App\Repositories\Category\CategoryRepository;
use App\Repositories\Contact\ContactRepository;
use App\Repositories\Portfolio\PortfolioRepository;
use App\Strategies\Files\MediaUploadStrategy;
use App\Strategies\Translation\Portfolio\PortfolioLangStrategy;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ContactRequestController extends Controller
{
    protected $contactRepo;

    public function __construct(ContactRepository $contactRepo)
    {
        $this->contactRepo = $contactRepo;
    }

    public function index()
    {
        $contacts = Contact::orderBy('created_at', 'desc')->paginate();

        return Inertia::render('Contact/Index', [
            'contacts' => $contacts
        ]);
    }

    public function view(Contact $contact)
    {
        return Inertia::render('Contact/View', [
            'contact' => $contact,
        ]);
    }

    public function update(UpdateContactRequest $request, Contact $contact)
    {
        try {
            DB::beginTransaction();

            $validator = $request->validated();

            if (!$validator) {
                return redirect()->route('contact.read')
                        ->withErrors($validator)
                        ->withInput();
            }
            
            $this->contactRepo->update($contact->id, [
                'read' => $request->get('read')
            ]);

            DB::commit();
        } catch (\Exception $e) {
            
            DB::rollBack();

            return redirect()->route('contact.view', $contact)->with('warning', __('Something wrong. Please try again'));
        }
        
        return redirect()->route('contact.index')->with('success', __('Saved with success'));
    }

    public function destroy(Contact $contact)
    {
        try {
            DB::beginTransaction();
            $this->contactRepo->destroy($contact->id);
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->route('contact.edit', $contact)->with('warning', __('Something wrong. Please try again'));
        }

        return redirect()->route('contact.index')->with('success', __('Deleted with success'));
    }
}
