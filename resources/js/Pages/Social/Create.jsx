import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

import { Head } from '@inertiajs/react';
import BackButton from '@/Components/Buttons/BackButton/Index';
import Form from '@/Components/Social/Form';

export default function Create({ auth, languages, translationFields, translationValues }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create social</h2>}
    >
      <Head title="Social" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
          <div className="mb-6 flex flex-wrap justify-end gap-3">
            <BackButton url={route('social.index')} text="Back to list" />
          </div>
        </div>
        
        <Form />
      </div>
    </AuthenticatedLayout>
  );
}
