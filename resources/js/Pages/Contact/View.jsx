
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Form from '@/Components/Contacts/Form';
import { Head } from '@inertiajs/react';
import BackButton from '@/Components/Buttons/BackButton/Index';
import PrimaryButton from '@/Components/PrimaryButton';
import axios from '@/Services/requests'
import { useState } from 'react';
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
});


export default function View({ auth, contact }) {
  const [read, setRead] = useState(false);

  const markAsRead = async () => {
    const response = await axios.post(route('contact.update', contact.id),
    {
      read: true
    });
    

    Toast.fire({
      icon: "success",
      title: "Signed as read"
    });

    setRead(true);
  }

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">View contact from {contact.firstname}</h2>}
    >
      <Head title="Contact" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
          <div className="flex justify-end mb-4">
            {!contact.read && !read && (
              <PrimaryButton onClick={() => markAsRead()}>Mark as read</PrimaryButton>
            )}
            <BackButton url={route('contact.index')} text="Back to list" />
          </div>
        </div>

        <Form data={contact} />
      </div>
    </AuthenticatedLayout>
  );
}
