import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import List from '@/Components/SiteSetting/List';
import { Head } from '@inertiajs/react';
import AddButton from '@/Components/Buttons/AddButton/Index';
import Pagination from '@/Components/Pagination/Index';

export default function Index({ auth, settings }) {

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Site Settings</h2>}
    >
      <Head title="Site Settings" />
      <div className="py-8">
        <div className="mx-auto mb-5 max-w-7xl space-y-6 px-3 sm:px-6 lg:px-8">
          <div className="flex justify-end">
            <AddButton url={route('site.setting.create')} />
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          <List items={settings.data} />
          <Pagination meta={settings} links={settings.links} />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
