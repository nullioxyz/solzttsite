import { useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import FormLang from '@/Components/Language/Form';
import Swal from 'sweetalert2';
import SelectDefault from '../SelectDefault';


export default function Form (props) {

  const { data, setData, post, processing, errors, reset } = useForm({
      slug: props.data ? props.data.slug : '',
      theme_id: props.data ? props.data.theme_id : null,
      languages: props.data ? props.data.langs : {}
  });
  
  const handleLangChange = (newLangData) => {
    setData('languages', newLangData);
  };

  const handleTheme = (value) => {
    setData('theme_id', value);
  }

  const submit = (e) => {
    e.preventDefault();
    post(props.data ? route('site.setting.update', props.data.slug) : route('site.setting.store') , {
        preserveScroll: true,
        data: data,
        onSuccess: () => {
          Swal.fire({
            title: "Saved!",
            text: "Your record has been saved.",
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
              <h3 className="text-sm font-semibold text-slate-700">Theme</h3>
              <p className="text-xs text-slate-500">Select the visual theme used on your site.</p>
            </div>
            <div className="p-5 sm:p-7">
            <InputLabel htmlFor="theme_id" value="Theme" className={`mt-1 block w-full text-black ${errors.theme_id ? 'text-[red]' : ''}`} />

            <SelectDefault
                name="theme_id"
                options={props.themes}
                selected={data.theme_id}
                className={`mt-1 block w-full ${errors.theme_id ? 'border-red-500' : ''}`}
                handleCategory={handleTheme}
            />

            {errors.theme_id && 
              <InputError message={errors.theme_id} className='mt-5'/>
            }
            </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 bg-slate-50 px-5 py-3.5">
              <h3 className="text-sm font-semibold text-slate-700">SEO & Texts</h3>
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
