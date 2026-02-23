import { useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import FormLang from '@/Components/Language/Form';
import Swal from 'sweetalert2';
import PrimaryButton from '../PrimaryButton';


export default function Form (props) {
  
  const { data, setData, post, processing, errors, reset } = useForm({
      slug: props.data ? props.data.slug : '',
      languages: props.data ? props.data.langs : {},
  });

  const handleLangChange = (newLangData) => {
    setData('languages', newLangData);
  };

  const submit = (e) => {
    e.preventDefault();

    post(props.data ? route('category.update', props.data.slug) : route('category.store') , {
        preserveScroll: true,
        data: data,
        onSuccess: () => {
          Swal.fire({
            title: "Saved!",
            text: "Your category has been saved.",
            icon: "success"
          });
        },
        onError: () => {},
    });
  };

  return (
    <form onSubmit={submit}>
      <div className="mx-auto max-w-7xl space-y-6 px-3 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 bg-slate-50 px-5 py-3.5">
              <h3 className="text-sm font-semibold text-slate-700">Category Details</h3>
              <p className="text-xs text-slate-500">Fill the required language fields to save this record.</p>
            </div>
            <div className="p-5 sm:p-7">
            <FormLang
              onLangChange={handleLangChange}
              existingData={data.languages}
              errors={errors}
            />
            </div>
        </div>

        <PrimaryButton className="w-full justify-center sm:w-auto" disabled={processing}>Save</PrimaryButton>
      </div>
    </form>
  )
}
