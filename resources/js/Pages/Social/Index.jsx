import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import List from '@/Components/Social/List';
import { Head } from '@inertiajs/react';
import AddButton from '@/Components/Buttons/AddButton/Index';
import Pagination from '@/Components/Pagination/Index';

export default function Index({ auth, socials }) {

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Social</h2>}
    >
      <Head title="Social" />

      <div className="py-8">
        <div className="mx-auto mb-5 max-w-7xl space-y-6 px-3 sm:px-6 lg:px-8">
          <div className="flex justify-end">
            <AddButton url={route('social.create')} />
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          <List items={socials.data} />
          <Pagination meta={socials} links={socials.links} />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
