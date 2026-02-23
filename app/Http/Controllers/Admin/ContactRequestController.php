<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateContactRequest;
use App\Models\Contact;
use App\Repositories\Contact\ContactRepository;
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
        $contacts = $this->contactRepo
            ->with(['portfolioReferences', 'reservedDesign'])
            ->orderBy('created_at', 'desc')->paginate(20);

        return Inertia::render('Contact/Index', [
            'contacts' => $contacts
        ]);
    }

    public function view(Contact $contact)
    {
        $contact->load('reservedDesign.media', 'portfolioReferences.media', 'media');

        return Inertia::render('Contact/View', [
            'contact' => $contact,
        ]);
    }

    public function update(UpdateContactRequest $request, Contact $contact)
    {
        try {
            DB::beginTransaction();

            $request->validated();
            
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

        return Inertia::location(route('contact.index'));
    }
}
