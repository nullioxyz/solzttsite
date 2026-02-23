import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import List from '@/Components/AvailableDesign/List';
import { Head } from '@inertiajs/react';
import AddButton from '@/Components/Buttons/AddButton/Index';
import Pagination from '@/Components/Pagination/Index';

export default function Index({ auth, designs  }) {
  
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Available Designs</h2>}
    >
      <Head title="Available Designs" />
      
      <div className="py-8">
        <div className="mx-auto mb-5 max-w-7xl space-y-6 px-3 sm:px-6 lg:px-8">
          <div className="flex justify-end">
            <AddButton url={route('available_design.create')} />
          </div>
        </div>
        
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          <List items={designs.data}/>
          <Pagination meta={designs} links={designs.links} />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
