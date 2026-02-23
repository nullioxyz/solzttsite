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
import { useMemo, useState } from "react";
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
        className="rounded-lg bg-slate-50 p-1"
        indicatorProps={{
          className: "rounded-md bg-white shadow-sm border border-slate-200",
        }}>
        {orderedLanguages.map(lang => (
          <Tab key={lang.slug} value={getTabValue(lang)} className="text-slate-700">
            <div className="text-sm font-medium">
              {lang.name} {lang.default ? ' (required)' : ''}
            </div>
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        {orderedLanguages.map(lang => (
          <TabPanel key={lang.id} value={getTabValue(lang)} className="mt-4 p-0">
            {errors.languages &&
              <InputError message={errors.languages} className='mb-4' />
            }
            <div className="space-y-5">
              {translationFields.map((field, index) => (
              <div key={lang.id + index} className="space-y-2">
                {field.field == 'title' ? (
                  <div>
                    <InputLabel
                      htmlFor={field.field}
                      value={field.label + (lang.default ? ' *' : '')}
                      className={`${getErrorMessage(lang.id, 'title') ? 'text-red-600' : ''}`}
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

                    {getErrorMessage(lang.id, 'title') && (
                      <InputError message={getErrorMessage(lang.id, 'title')} className='mt-2' />
                    )
                    }
                  </div>
                ) : null}

                {field.field == 'description' ? (
                  <div key={`lang[${lang.id}][${lang.name}][${lang.id}]`}>
                    <InputLabel
                      htmlFor={field.field}
                      value={field.label + (lang.default ? ' *' : '')}
                      className={`${getErrorMessage(lang.id, 'description') ? 'text-red-600' : ''}`}
                    />
                    <div className="rounded-lg bg-white p-0.5">
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
                          onReady={() => {}}
                          onChange={(e, editor) => handleInputChange(lang.id, field.field, editor.getData())}
                        />
                    </div>
                    {getErrorMessage(lang.id, 'description') &&
                      <InputError message={getErrorMessage(lang.id, 'description')} className='mt-2' />
                    }
                  </div>
                ) : null}

                {field.field == 'keywords' ? (
                  <div key={`lang[${lang.id}][${lang.name}][${lang.id}]`}>
                    <InputLabel
                      htmlFor={field.field}
                      value={field.label}
                      className={`${getErrorMessage(lang.id, 'keywords') ? 'text-red-600' : ''}`}
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
                      <InputError message={getErrorMessage(lang.id, 'keywords')} className='mt-2' />
                    }
                  </div>
                ) : null}

                
              </div>
            ))}
            </div>
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  )

}
