import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import List from '@/Components/Category/List';
import { Head } from '@inertiajs/react';
import AddButton from '@/Components/Buttons/AddButton/Index';

export default function Index({ auth, categories  }) {
    
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Categories</h2>}
        >
            <Head title="Categories" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="flex justify-end mb-4">
                        <AddButton url={route('category.create')} />
                    </div>
                </div>
            
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <List items={categories.data}/>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
