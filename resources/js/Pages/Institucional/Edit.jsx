
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Form from '@/Components/Institucional/Form';
import { Head, useForm } from '@inertiajs/react';
import DeleteButton from '@/Components/Buttons/DeleteButton/Index';
import BackButton from '@/Components/Buttons/BackButton/Index';
import { LanguageProvider } from '@/Contexts/LanguageContext';

export default function Edit({ auth, institucional, languages, translationFields, translationValues }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        slug: institucional.slug
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('institucional.update', institucional.slug), {
            preserveScroll: true,
            data: data,
            onSuccess: () => reset(),
            onError: () => {},
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create institucional</h2>}
        >
            <Head title="Institucional" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="flex justify-end mb-4">
                        <DeleteButton deleteUrl={route('institucional.delete', data.slug)} />
                        <BackButton url={route('institucional.index')} text="Back to list" />
                    </div>
                </div>
                
                <LanguageProvider languages={languages} translationFields={translationFields} translationValues={translationValues}>
                    <Form data={institucional} />
                </LanguageProvider>
            </div>
        </AuthenticatedLayout>
    );
}
