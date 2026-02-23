import { useLanguages } from "@/Contexts/LanguageContext";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import TextInput from "../TextInput";
import InputLabel from "../InputLabel";
import { useEffect, useMemo, useState } from "react";
import InputError from "../InputError";

function normalizeExistingData(data) {
  if (!data) return {};

  if (Array.isArray(data)) {
    return data.reduce((acc, item) => {
      if (!item?.language_id) return acc;
      acc[item.language_id] = item;
      return acc;
    }, {});
  }

  return data;
}

export default function Form({ onLangChange, existingData, errors }) {

  const [languagesData, setLanguagesData] = useState(() => normalizeExistingData(existingData));
  const { languages, translationFields } = useLanguages();
  const orderedLanguages = useMemo(() => {
    return [...(languages || [])].sort((a, b) => Number(Boolean(b.default)) - Number(Boolean(a.default)));
  }, [languages]);

  const getTabValue = (lang) => String(lang.slug || lang.id);
  const initialTabValue = useMemo(() => {
    if (!orderedLanguages.length) return '';

    const preferredLang =
      orderedLanguages.find((lang) => lang.default) ||
      orderedLanguages.find((lang) => lang.slug === 'en') ||
      orderedLanguages[0];

    return getTabValue(preferredLang);
  }, [orderedLanguages]);

  const getErrorMessage = (id, field) => {
    const errorKey = `languages.${id}.${field}`;
    return errors?.[errorKey];
  };

  const handleInputChange = (langId, field, fieldValue) => {
    const updatedData = {
      ...languagesData,
      [langId]: {
        ...languagesData[langId],
        [field]: fieldValue,
      },
    };

    setLanguagesData(updatedData);
    onLangChange(updatedData);
  };

  if (!initialTabValue) return null;

  return (
    <Tabs value={initialTabValue}>
      <TabsHeader
        className="bg-transparent"
        indicatorProps={{
          className: "bg-gray-900/10 shadow-none !text-gray-900",
        }}>
        {orderedLanguages.map(lang => (
          <Tab key={lang.slug} value={getTabValue(lang)}>
            <div className="text-black">
              {lang.name} {lang.default ? ' (required)' : ''}
            </div>
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        {orderedLanguages.map(lang => (
          <TabPanel key={lang.id} value={getTabValue(lang)}>
            {errors.languages &&
              <InputError message={errors.languages} className='mt-5' />
            }
            {translationFields.map((field, index) => (
              <div key={lang.id + index}>
                {field.field == 'title' ? (
                  <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <InputLabel
                      htmlFor={field.field}
                      value={field.label}
                      className={`mt-1 block w-full text-black ${getErrorMessage(lang.id, 'title') ? 'text-[red]' : ''}`}
                    />

                    <TextInput
                      id={`lang[${lang.id}][${lang.name}]`}
                      name={`lang[${lang.id}][${field.field}]`}
                      className={`mt-1 block w-full ${getErrorMessage(lang.id, 'title') ? 'border-red-500' : ''}`}
                      autoComplete="title"
                      required={lang.default ? true : false}
                      value={languagesData[lang.id] !== undefined && languagesData[lang.id].title ? languagesData[lang.id].title : ''}
                      onChange={(e) => handleInputChange(lang.id, field.field, e.target.value)}
                    />

                    {getErrorMessage(lang.id, 'title') &&
                      <InputError message={getErrorMessage(lang.id, 'title')} className='mt-5' />
                    }
                  </div>
                ) : null}

                {field.field == 'description' ? (
                  <div key={`lang[${lang.id}][${lang.name}][${lang.id}]`} className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <InputLabel
                      htmlFor={field.field}
                      value={field.label}
                      className={`mt-1 block w-full text-black ${getErrorMessage(lang.id, 'description') ? 'text-[red]' : ''}`}
                    />
                      <CKEditor
                        editor={ClassicEditor}
                        config={{
                          removePlugins: ['ImageUpload', 'EasyImage', 'MediaEmbed', 'MediaEmbedToolbar'],
                          image: {
                            toolbar: [ 'imageTextAlternative' ]
                          },
                          mediaEmbed: {
                            previewsInData: true
                          },
                        }}
                        data={languagesData && languagesData[lang.id] !== undefined && languagesData[lang.id].description ? languagesData[lang.id].description : ''}
                        required={lang.default ? true : false}
                        name={`lang[${lang.id}][${field.field}]`}
                        onReady={editor => {

                        }}
                        onChange={(e, editor) => handleInputChange(lang.id, field.field, editor.getData())}
                      />
                    {getErrorMessage(lang.id, 'description') &&
                      <InputError message={getErrorMessage(lang.id, 'description')} className='mt-5' />
                    }
                  </div>
                ) : null}

                {field.field == 'keywords' ? (
                  <div key={`lang[${lang.id}][${lang.name}][${lang.id}]`} className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <InputLabel
                      htmlFor={field.field}
                      value={field.label}
                      className={`mt-1 block w-full text-black ${getErrorMessage(lang.id, 'keywords') ? 'text-[red]' : ''}`}
                    />

                    <TextInput
                      value={languagesData[lang.id] !== undefined && languagesData[lang.id].keywords ? languagesData[lang.id].keywords : ''}
                      id={`lang[${lang.id}][${lang.name}]`}
                      name={`lang[${lang.id}][${field.field}]`}
                      className={`mt-1 block w-full ${getErrorMessage(lang.id, 'keywords') ? 'border-red-500' : ''}`}
                      autoComplete="title"
                      required={lang.default ? true : false}
                      onChange={(e) => handleInputChange(lang.id, field.field, e.target.value)}
                    />

                    {getErrorMessage(lang.id, 'keywords') &&
                      <InputError message={getErrorMessage(lang.id, 'keywords')} className='mt-5' />
                    }
                  </div>
                ) : null}

                
              </div>
            ))}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  )

}
