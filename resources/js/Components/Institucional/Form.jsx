import { useForm, router } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import FormLang from '@/Components/Language/Form';
import Dropfile from '@/Components/Files/Dropfile';
import { useState } from 'react';
import { Gallery } from '../Files/Gallery';
import Swal from 'sweetalert2';
import request from '@/Services/requests';


export default function Form (props) {
  
  const { data, setData, post, processing, errors, reset } = useForm({
      slug: props.data ? props.data.slug : '',
      languages: props.data ? props.data.langs : {},
      files: {},
      existingFiles: props.data ? props.data.media : {}
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
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    });

    if (!result.isConfirmed) return;

    try {
      await request.delete(route('institucional.removeFile', [fileId, data.slug]));

      updateExistingFiles(index);
      await Swal.fire({
        title: "Deleted!",
        text: "Your file has been removed.",
        icon: "success"
      });
    } catch (error) {
      const message = error?.response?.data?.message || "Unable to remove this file. Please try again.";
      await Swal.fire({
        title: "Error",
        text: message,
        icon: "error"
      });
    }
  }
  
  const handleLangChange = (newLangData) => {
    setData('languages', newLangData);
  };

  const submit = (e) => {
    e.preventDefault();

    post(props.data ? route('institucional.update', props.data.slug) : route('institucional.store') , {
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
            <h3 className="text-sm font-semibold text-slate-700">Media Upload</h3>
            <p className="text-xs text-slate-500">Upload a featured image for this institutional content.</p>
          </div>
          <div className="p-5 sm:p-7">
            <InputLabel htmlFor="files" value="Drop files here" className="mt-1 block w-full text-black" />
            <Dropfile
              uploadedFiles={uploadedFiles}
              onUpload={uploadFiles}
              onDelete={deleteFile}
              count={1}
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
              <InputLabel htmlFor="files" value="Uploaded files" className="mt-1 block w-full text-black" />
              <Gallery files={data.existingFiles} onDelete={removeExistingFile} />
            </div>
          </div>
        ) : null}


        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 bg-slate-50 px-5 py-3.5">
              <h3 className="text-sm font-semibold text-slate-700">Translations</h3>
            </div>
            <div className="p-5 text-black sm:p-7">
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
