import { useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import Swal from 'sweetalert2';
import PrimaryButton from '../PrimaryButton';


export default function Form (props) {
  
  const { data, setData, post, processing, errors, reset } = useForm({
      url: props.data ? props.data.url : null,
      name: props.data ? props.data.name : null,
  });

  const submit = (e) => {
    e.preventDefault();

    post(props.data ? route('social.update', props.data.name) : route('social.store') , {
        preserveScroll: true,
        data: data,
        onSuccess: () => {
          Swal.fire({
            title: "Saved!",
            text: "Your social has been saved.",
            icon: "success"
          });
        }
    });
  };

  return (
    <form onSubmit={submit}>
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
            <InputLabel htmlFor="ñame" value="name" className={`mt-1 block w-full ${errors.name ? 'text-[red]' : ''}`} />

            <TextInput
                id="name"
                type="text"
                name="name"
                value={data.name}
                className={`mt-1 block w-full ${errors.slug ? 'border-red-500' : ''}`}
                autoComplete="name"
                onChange={(e) => setData('name', e.target.value)}
            />

            {errors.name && 
              <InputError message={errors.name} className='mt-5'/>
            }
        </div>

        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
            <InputLabel htmlFor="url" value="url" className={`mt-1 block w-full ${errors.url ? 'text-[red]' : ''}`} />

            <TextInput
                id="url"
                type="text"
                name="url"
                value={data.url}
                className={`mt-1 block w-full ${errors.url ? 'border-red-500' : ''}`}
                autoComplete="url"
                onChange={(e) => setData('url', e.target.value)}
            />

            {errors.url && 
              <InputError message={errors.url} className='mt-5'/>
            }
        </div>

        <PrimaryButton disabled={processing}>Save</PrimaryButton>
      </div>
    </form>
  )
}