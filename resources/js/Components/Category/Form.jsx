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
        onError: (errors) => {
            console.log(errors);
        },
    });
  };

  return (
    <form onSubmit={submit}>
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
            <InputLabel htmlFor="slug" value="Slug" className={`mt-1 block w-full ${errors.slug ? 'text-[red]' : ''}`} />

            <TextInput
                id="slug"
                type="text"
                name="slug"
                value={data.slug}
                className={`mt-1 block w-full ${errors.slug ? 'border-red-500' : ''}`}
                autoComplete="slug"
                onChange={(e) => setData('slug', e.target.value)}
            />

            {errors.slug && 
              <InputError message={errors.slug} className='mt-5'/>
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