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
      <div className="mx-auto max-w-7xl space-y-6 px-3 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 bg-slate-50 px-5 py-3.5">
              <h3 className="text-sm font-semibold text-slate-700">Social Link</h3>
              <p className="text-xs text-slate-500">Configure the social network name and URL.</p>
            </div>
            <div className="p-5 sm:p-7">
            <InputLabel htmlFor="name" value="name" className={`mt-1 block w-full text-black ${errors.name ? 'text-[red]' : ''}`} />

            <TextInput
                id="name"
                type="text"
                name="name"
                value={data.name}
                className={`mt-1 block w-full ${errors.name ? 'border-red-500' : ''}`}
                autoComplete="name"
                onChange={(e) => setData('name', e.target.value)}
            />

            {errors.name && 
              <InputError message={errors.name} className='mt-5'/>
            }
            </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 bg-slate-50 px-5 py-3.5">
              <h3 className="text-sm font-semibold text-slate-700">Destination</h3>
            </div>
            <div className="p-5 sm:p-7">
            <InputLabel htmlFor="url" value="url" className={`mt-1 block w-full text-black ${errors.url ? 'text-[red]' : ''}`} />

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
        </div>

        <PrimaryButton className="w-full justify-center sm:w-auto" disabled={processing}>Save</PrimaryButton>
      </div>
    </form>
  )
}
