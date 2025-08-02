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
        router.delete(route('institucional.removeFile', [fileId, data.slug]), {
          onSuccess: () => {
            Swal.fire({
              title: "Deleted!",
              text: "Your record has been deleted.",
              icon: "success"
            });

            updateExistingFiles(index);
          },
          preserveScroll: true
        })
      }
    });
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
        onError: (errors) => {
            console.log(errors);
        },
    });
  };

  return (
    <form onSubmit={submit}>
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">

        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
          <InputLabel htmlFor="files" value="Dropfiles here" className="mt-1 block w-full text-black" />
          <Dropfile
            uploadedFiles={uploadedFiles}
            onUpload={uploadFiles}
            onDelete={deleteFile}
            count={1}
            formats={["jpg", "jpeg", "png"]}
          />
        </div>

        {data.existingFiles && Array.isArray(data.existingFiles) && data.existingFiles.length > 0 ? (
          <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
            <InputLabel htmlFor="files" value="Uploaded files" className="mt-1 block w-full text-black" />
            <Gallery files={data.existingFiles} onDelete={removeExistingFile} />
          </div>
        ) : null}


        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg text-black">
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