
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Form from '@/Components/Portfolio/Form';
import { Head, useForm } from '@inertiajs/react';
import DeleteButton from '@/Components/Buttons/DeleteButton/Index';
import BackButton from '@/Components/Buttons/BackButton/Index';
import { LanguageProvider } from '@/Contexts/LanguageContext';

export default function Edit({ auth, portfolio, languages, translationFields, translationValues, categories }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        slug: portfolio.slug,
        category_id: portfolio.category_id
    });

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit portfolio {portfolio.slug}</h2>}
        >
            <Head title="Potfolio" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="mb-6 flex flex-wrap justify-end gap-3">
                        <DeleteButton deleteUrl={route('portfolio.delete', portfolio.slug)} />
                        <BackButton url={route('portfolio.index')} text="Back to list" />
                    </div>
                </div>
                
                <LanguageProvider languages={languages} translationFields={translationFields} translationValues={translationValues}>
                    <Form data={portfolio} categories={categories} />
                </LanguageProvider>
            </div>
        </AuthenticatedLayout>
    );
}
