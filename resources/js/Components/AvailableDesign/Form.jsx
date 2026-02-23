import { router, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import FormLang from '@/Components/Language/Form';
import Dropfile from '@/Components/Files/Dropfile';
import { useState } from 'react';
import { Gallery } from '../Files/Gallery';
import Swal from 'sweetalert2';
import SelectDefault from '../SelectDefault';

function ToggleSwitch({ checked, onToggle, onLabel = 'On', offLabel = 'Off' }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onToggle}
      className={`relative inline-flex h-7 w-14 items-center rounded-full border transition ${
        checked
          ? 'border-emerald-500 bg-emerald-500/20'
          : 'border-slate-300 bg-slate-200/70'
      }`}
    >
      <span
        className={`inline-flex h-6 w-6 transform items-center justify-center rounded-full bg-white text-[10px] font-semibold shadow-sm transition ${
          checked ? 'translate-x-7 text-emerald-700' : 'translate-x-0.5 text-slate-500'
        }`}
      >
        {checked ? onLabel : offLabel}
      </span>
    </button>
  );
}

export default function Form (props) {

  const { data, setData, post, processing, errors, reset } = useForm({
      slug: props.data ? props.data.slug : '',
      active: props.data ? props.data.active : true,
      available: props.data ? props.data.available : true,
      category_id: props.data ? props.data.category_id : null,
      languages: props.data ? props.data.langs : {},
      files: {},
      existingFiles: props.data ? props.data.media : {},
  });
  
  const [uploadedFiles, setuploadedFiles] = useState([]);

  function uploadFiles(f) {
    setData('files', [...uploadedFiles, ...f]);
    setuploadedFiles([...uploadedFiles, ...f]);
  }

  function deleteFile(indexImg) {
    const updatedList = uploadedFiles.filter((ele, index) => index !== indexImg);

    setData('files', updatedList);
    setuploadedFiles(updatedList);
  }

  function updateExistingFiles(indexImg) {
    const updatedList = data.existingFiles.filter((ele, index) => index !== indexImg);

    setData('existingFiles', updatedList);
  }

  async function removeExistingFile(fileId, index) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        router.delete(route('available.removeFile', [fileId, data.slug]), {
          onSuccess: () => {
            Swal.fire({
              title: "Deleted!",
              text: "Your record has been deleted.",
              icon: "success"
            });

            updateExistingFiles(index);
          },
          preserveScroll: true,
        })
      }
    });
  }
  
  const handleLangChange = (newLangData) => {
    setData('languages', newLangData);
  };

  const handleCategory = (value) => {
    setData('category_id', value);
  }

  const handleReorder = (sortedFiles, reorderedFiles) => {
    setData('existingFiles', reorderedFiles);
    router.post(route('media.sort', [sortedFiles]), {
      onSuccess: () => {},
      preserveScroll: true,
      preserveState: true,

    })
  };

  const submit = (e) => {
    e.preventDefault();
    
    post(props.data ? route('available_design.update', props.data.slug) : route('available_design.store') , {
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
            
        },
    });
  };

  return (
    <form onSubmit={submit}>
      <div className="mx-auto max-w-7xl space-y-6 px-3 sm:px-6 lg:px-8">

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 bg-slate-50 px-5 py-3.5">
              <h3 className="text-sm font-semibold text-slate-700">General</h3>
            </div>
            <div className="p-5 sm:p-7">
            <InputLabel htmlFor="category_id" value="Category" className={`mt-1 block w-full text-black ${errors.category_id ? 'text-[red]' : ''}`} />

            <SelectDefault
                name="category_id"
                options={props.categories}
                selected={data.category_id}
                className={`mt-1 block w-full ${errors.category_id ? 'border-red-500' : ''}`}
                handleCategory={handleCategory}
            />

            {errors.category_id && 
              <InputError message={errors.category_id} className='mt-5'/>
            }
            </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 bg-slate-50 px-5 py-3.5">
            <h3 className="text-sm font-semibold text-slate-700">Status</h3>
          </div>
          <div className="grid gap-4 p-5 sm:grid-cols-2 sm:p-7">
            <label className="flex items-center justify-between rounded-lg border border-slate-200 px-4 py-3">
              <span className="text-sm font-medium text-slate-700">
                Active
              </span>
              <ToggleSwitch
                checked={Boolean(data.active)}
                onToggle={() => setData('active', !data.active)}
              />
            </label>

            <label className="flex items-center justify-between rounded-lg border border-slate-200 px-4 py-3">
              <span className="text-sm font-medium text-slate-700">Available</span>
              <ToggleSwitch
                checked={Boolean(data.available)}
                onToggle={() => setData('available', !data.available)}
              />
            </label>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 bg-slate-50 px-5 py-3.5">
            <h3 className="text-sm font-semibold text-slate-700">Media Upload</h3>
          </div>
          <div className="p-5 sm:p-7">
          <InputLabel htmlFor="files" value="Dropfiles here" className="mt-1 block w-full text-black" />

          <Dropfile
            uploadedFiles={uploadedFiles}
            onUpload={uploadFiles}
            onDelete={deleteFile}
            count={10}
            formats={["jpg", "jpeg", "png"]}
          />
          </div>
        </div>

        {data.existingFiles && Array.isArray(data.existingFiles) && data.existingFiles.length > 0 ? (
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 bg-slate-50 px-5 py-3.5">
              <h3 className="text-sm font-semibold text-slate-700">Uploaded Files</h3>
            </div>
            <div className="p-5 sm:p-7">
            <InputLabel htmlFor="files" value="Uploaded files" className="mt-1 block w-full " />
            <Gallery files={data.existingFiles} onDelete={removeExistingFile} onReorder={handleReorder} />
            </div>
          </div>
        ) : null}


        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 bg-slate-50 px-5 py-3.5">
              <h3 className="text-sm font-semibold text-slate-700">Translations</h3>
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
