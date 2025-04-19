import { useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import FormLang from '@/Components/Language/Form';
import Dropfile from '@/Components/Files/Dropfile';
import { useState } from 'react';
import { Gallery } from '../Files/Gallery';
import Swal from 'sweetalert2';
import { Inertia } from '@inertiajs/inertia';
import SelectDefault from '../SelectDefault';
import { Checkbox } from '@material-tailwind/react';


export default function Form (props) {

  const { data, setData, post, processing, errors, reset } = useForm({
      slug: props.data ? props.data.slug : '',
      title: props.data ? props.data.slug : '',
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

  async function removeExistingFile(fileId) {
    
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
        Inertia.delete(route('portfolio.removeFile', [fileId, data.slug]), {
          onSuccess: () => {}
        })

        Swal.fire({
          title: "Deleted!",
          text: "Your record has been deleted.",
          icon: "success"
        });
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
    Inertia.post(route('media.sort', [sortedFiles]), {
      onSuccess: (page) => {
        
      },
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
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
            <InputLabel htmlFor="title" value="Title" className={`mt-1 block w-full ${errors.slug ? 'text-[red]' : ''}`} />

            <TextInput
                id="title"
                type="text"
                name="title"
                value={data.title}
                className={`mt-1 block w-full ${errors.title ? 'border-red-500' : ''}`}
                autoComplete="title"
                onChange={(e) => setData('title', e.target.value)}
            />

            {errors.title && 
              <InputError message={errors.title} className='mt-5'/>
            }
        </div>

        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
            <InputLabel htmlFor="category_id" value="Category" className={`mt-1 block w-full ${errors.category_id ? 'text-[red]' : ''}`} />

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

        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
            <InputLabel htmlFor="active" value="Active" className='mt-1' />
            <Checkbox
              defaultChecked={data.active}
              ripple={false}
              onClick={(e) => setData('active', !data.active)}
              className="h-8 w-8 rounded-full border-green-900/20 bg-green-900/10 transition-all hover:scale-105 hover:before:opacity-0"
            />
        </div>


        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">

          <InputLabel htmlFor="available" value="available" className='mt-1' />

          <Checkbox
            onClick={(e) => setData('available', !data.available)}
            defaultChecked={data.available}
            ripple={false}
            className="h-8 w-8 rounded-full border-green-900/20 bg-green-900/10 transition-all hover:scale-105 hover:before:opacity-0"
          />
        </div>

        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
          <InputLabel htmlFor="files" value="Dropfiles here" className="mt-1 block w-full " />

          <Dropfile
            uploadedFiles={uploadedFiles}
            onUpload={uploadFiles}
            onDelete={deleteFile}
            count={10}
            formats={["jpg", "jpeg", "png"]}
          />
        </div>

        {data.existingFiles && Array.isArray(data.existingFiles) && data.existingFiles.length > 0 ? (
          <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
            <InputLabel htmlFor="files" value="Uploaded files" className="mt-1 block w-full " />
            <Gallery files={data.existingFiles} onDelete={removeExistingFile} onReorder={handleReorder} />
          </div>
        ) : null}


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