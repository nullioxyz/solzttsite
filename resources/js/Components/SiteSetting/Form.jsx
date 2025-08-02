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
        onError: (errors) => {
            console.log(errors);
        },
    });
  };

  return (
    <form onSubmit={submit}>
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
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

        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
            <FormLang
              onLangChange={handleLangChange}
              existingData={data.languages}
              errors={errors}
            />
        </div>

        <PrimaryButton disabled={processing}>Save</PrimaryButton>

      </div>
    </form>
  )
}