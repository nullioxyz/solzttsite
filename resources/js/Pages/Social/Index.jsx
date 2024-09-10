import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import List from '@/Components/Social/List';
import { Head } from '@inertiajs/react';
import AddButton from '@/Components/Buttons/AddButton/Index';

export default function Index({ auth, socials }) {

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Social</h2>}
    >
      <Head title="Social" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
          <div className="flex justify-end mb-4">
            <AddButton url={route('social.create')} />
          </div>
        </div>

        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <List items={socials.data} />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
