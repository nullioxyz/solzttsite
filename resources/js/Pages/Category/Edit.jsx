
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Form from '@/Components/Category/Form';
import { Head, useForm } from '@inertiajs/react';
import DeleteButton from '@/Components/Buttons/DeleteButton/Index';
import BackButton from '@/Components/Buttons/BackButton/Index';
import { LanguageProvider } from '@/Contexts/LanguageContext';

export default function Edit({ auth, category, languages, translationFields, translationValues }) {

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit category {category.slug} </h2>}
        >
            <Head title="Category" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="flex justify-end mb-4">
                        <DeleteButton deleteUrl={route('category.delete', category.slug)} />
                        <BackButton url={route('category.index')} text="Back to list" />
                    </div>
                </div>
                
                <LanguageProvider languages={languages} translationFields={translationFields} translationValues={translationValues}>
                    <Form data={category} />
                </LanguageProvider>
            </div>
        </AuthenticatedLayout>
    );
}
