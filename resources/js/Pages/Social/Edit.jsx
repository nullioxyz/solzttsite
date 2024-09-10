
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Form from '@/Components/Social/Form';
import { Head, useForm } from '@inertiajs/react';
import DeleteButton from '@/Components/Buttons/DeleteButton/Index';
import BackButton from '@/Components/Buttons/BackButton/Index';

export default function Edit({ auth, social }) {

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit social {social.name} </h2>}
    >
      <Head title="Social" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
          <div className="flex justify-end mb-4">
            <DeleteButton deleteUrl={route('social.delete', social.name)} />
            <BackButton url={route('social.index')} text="Back to list" />
          </div>
        </div>

        <Form data={social} />
      </div>
    </AuthenticatedLayout>
  );
}
