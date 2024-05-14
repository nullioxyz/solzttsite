import { useRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import Select from '@/Components/Select';
import { Head, useForm } from '@inertiajs/react';
import BackButton from '@/Components/Buttons/BackButton/Index';

export default function Create({ auth }) {
    const editorRef = useRef(null);
    const { data, setData, post, processing, errors, reset } = useForm({
        language_id: '',
        content_type_id: '',
        title: '',
        subtitle: '',
        description: '',
        slug: ''
    });

    const options = [
        { label: 'Tatto', value: 1 },
        { label: 'Painting', value: 2 },
    ];

    const langs = [
        { label: 'PT-BR', value: 1 },
    ];

    const submit = (e) => {
        e.preventDefault();
        
        post(route('institucional.store'), {
            preserveScroll: true,
            data: data,
            onSuccess: () => reset(),
            onError: (errors) => {
                console.log(errors);
            },
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create institucional</h2>}
        >
            <Head title="Institucional" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="flex justify-end mb-4">
                        <BackButton url={route('institucional.index')} text="Back to list" />
                    </div>
                </div>
                <form onSubmit={submit}>

                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                            <InputLabel htmlFor="Content type" value="Content Type"/>
                            <Select
                                onChange={(e) => setData('content_type_id', e.target.value)}
                                name="content_type_id"
                                options={options}/>
                            
                            {errors.content_type_id && 
                                <InputError message={errors.content_type_id} />
                            }
                        </div>

                        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                            <InputLabel htmlFor="Language" value="Language"/>

                            <Select
                                onChange={(e) => setData('language_id', e.target.value)}
                                name="language_id"
                                options={langs}
                            />
                            {errors.language_id && 
                                <InputError message={errors.language_id} />
                            }
                        </div>

                        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                            
                            <InputLabel htmlFor="title" value="Title" />

                            <TextInput
                                id="title"
                                name="title"
                                value={data.title}
                                className="mt-1 block w-full"
                                autoComplete="title"
                                isFocused={true}
                                onChange={(e) => setData('title', e.target.value)}
                                required
                            />

                            {errors.title && 
                                <InputError message={errors.title} />
                            }
                        </div>

                        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                            <InputLabel htmlFor="subtitle" value="subtitle" />

                            <TextInput
                                id="subtitle"
                                name="subtitle"
                                value={data.subtitle}
                                className="mt-1 block w-full"
                                autoComplete="subtitle"
                                isFocused={true}
                                onChange={(e) => setData('subtitle', e.target.value)}
                                required
                            />

                            {errors.subtitle && 
                              <InputError message={errors.subtitle} />
                            }
                        </div>

                        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                            <CKEditor
                                editor={ ClassicEditor }
                                data={data.description}
                                name="description"
                                onReady={ editor => {
                                    // You can store the "editor" and use when it is needed.
                                    console.log( 'Editor is ready to use!', editor );
                                } }
                                onChange={ ( event, editor ) => setData('description', editor.getData()) }
                                onBlur={ ( event, editor ) => {
                                    console.log( 'Blur.', editor );
                                } }
                                onFocus={ ( event, editor ) => {
                                    console.log( 'Focus.', editor );
                                } }
                            />
                        </div>

                        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                            <InputLabel htmlFor="slug" value="Slug" />

                            <TextInput
                                id="slug"
                                type="text"
                                name="slug"
                                value={data.slug}
                                className="mt-1 block w-full"
                                autoComplete="slug"
                                onChange={(e) => setData('slug', e.target.value)}
                                required
                            />

                            {errors.slug && 
                              <InputError message={errors.slug} />
                            }
                        </div>

                        <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
