import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

import { Head } from '@inertiajs/react';
import BackButton from '@/Components/Buttons/BackButton/Index';
import Form from '@/Components/Category/Form';
import { LanguageProvider } from '@/Contexts/LanguageContext';

export default function Create({ auth, languages, translationFields, translationValues }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create category</h2>}
        >
            <Head title="Category" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="mb-6 flex flex-wrap justify-end gap-3">
                        <BackButton url={route('category.index')} text="Back to list" />
                    </div>
                </div>

                <LanguageProvider languages={languages} translationFields={translationFields} translationValues={translationValues}>
                    <Form />
                </LanguageProvider>
            </div>
        </AuthenticatedLayout>
    );
}
