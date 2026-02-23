import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import List from '@/Components/Portfolio/List';
import { Head } from '@inertiajs/react';
import AddButton from '@/Components/Buttons/AddButton/Index';
import Pagination from '@/Components/Pagination/Index';

export default function Index({ auth, portfolio  }) {
    
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Portfolio</h2>}
    >
      <Head title="Portfolio" />

      <div className="py-8">
        <div className="mx-auto mb-5 max-w-7xl space-y-6 px-3 sm:px-6 lg:px-8">
          <div className="flex justify-end">
            <AddButton url={route('portfolio.create')} />
          </div>
        </div>
    
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          <List items={portfolio.data}/>
          <Pagination meta={portfolio} links={portfolio.links} />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
