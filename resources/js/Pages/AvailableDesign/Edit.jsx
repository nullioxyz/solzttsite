
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Form from '@/Components/AvailableDesign/Form';
import { Head, router } from '@inertiajs/react';
import DeleteButton from '@/Components/Buttons/DeleteButton/Index';
import BackButton from '@/Components/Buttons/BackButton/Index';
import { LanguageProvider } from '@/Contexts/LanguageContext';

export default function Edit({ auth, design, languages, translationFields, translationValues, categories }) {
  
  const handleFileRemoved = () => {
    console.log('fff');
    router.reload();
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit available design {design.slug}</h2>}
    >
      <Head title="Available Design" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
          <div className="flex justify-end mb-4">
            <DeleteButton deleteUrl={route('available_design.delete', design.slug)} />
            <BackButton url={route('available_design.index')} text="Back to list" />
          </div>
        </div>

        <LanguageProvider languages={languages} translationFields={translationFields} translationValues={translationValues}>
          <Form data={design} categories={categories} onFileRemoved={handleFileRemoved} />
        </LanguageProvider>
      </div>
    </AuthenticatedLayout>
  );
}
