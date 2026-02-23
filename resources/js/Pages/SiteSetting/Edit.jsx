
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Form from '@/Components/SiteSetting/Form';
import { Head, useForm } from '@inertiajs/react';
import DeleteButton from '@/Components/Buttons/DeleteButton/Index';
import BackButton from '@/Components/Buttons/BackButton/Index';
import { LanguageProvider } from '@/Contexts/LanguageContext';

export default function Edit({ auth, setting, languages, translationFields, translationValues, themes }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    slug: setting.slug,
    theme_id: setting.theme_id
  });

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit setting {setting.slug}</h2>}
    >
      <Head title="Setting" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
          <div className="mb-6 flex flex-wrap justify-end gap-3">
            {setting.id !== 1 && (
              <DeleteButton deleteUrl={route('site.setting.delete', setting.slug)} />
            )}
            <BackButton url={route('site.setting.index')} text="Back to list" />
          </div>
        </div>

        <LanguageProvider languages={languages} translationFields={translationFields} translationValues={translationValues}>
          <Form data={setting} themes={themes} />
        </LanguageProvider>
      </div>
    </AuthenticatedLayout>
  );
}
