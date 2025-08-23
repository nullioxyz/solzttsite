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
      
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
          <div className="flex justify-end mb-4">
            <AddButton url={route('available_design.create')} />
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <List items={designs.data}/>
          <Pagination meta={designs} links={designs.links} />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
