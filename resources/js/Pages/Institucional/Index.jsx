import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import List from '@/Components/Institucional/List';
import { Head } from '@inertiajs/react';
import Pagination from '@/Components/Pagination/Index';

export default function Index({ auth, institucionals  }) {
  console.log(institucionals);
  return (
    <AuthenticatedLayout
    user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Institucional</h2>}
    >
      <Head title="Institucional" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <List items={institucionals.data}/>
          <Pagination meta={institucionals} links={institucionals.links} />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
