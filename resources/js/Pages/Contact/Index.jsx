import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import List from '@/Components/Contacts/List';
import { Head } from '@inertiajs/react';
import Pagination from '@/Components/Pagination/Index';

export default function Index({ auth, contacts }) {

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Contacts</h2>}
    >
      <Head title="Contacts" />

      <div className="py-8">

        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          <List items={contacts.data} />
          <Pagination meta={contacts.meta} links={contacts.links} />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
