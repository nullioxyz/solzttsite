import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

import { Head } from '@inertiajs/react';
import BackButton from '@/Components/Buttons/BackButton/Index';
import Form from '@/Components/Institucional/Form';
import { LanguageProvider } from '@/Contexts/LanguageContext';

export default function Create({ auth, languages, translationFields, translationValues }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create institucional</h2>}
        >
            <Head title="Institucional" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="flex justify-end mb-4">
                        <BackButton url={route('institucional.index')} text="Back to list" />
                    </div>
                </div>

                <LanguageProvider languages={languages} translationFields={translationFields} translationValues={translationValues}>
                    <Form />
                </LanguageProvider>
            </div>
        </AuthenticatedLayout>
    );
}
