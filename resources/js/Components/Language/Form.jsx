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
import { useEffect, useState } from "react";
import InputError from "../InputError";

export default function Form ({ onLangChange, existingData, errors }) {
  
  const [languagesData, setLanguagesData] = useState(existingData || {});
  const {languages, translationFields} = useLanguages();
  const [normalizedData, setNormalizedData] = useState(false);

  useEffect(() => {
    if(!normalizedData && Object.keys(languagesData).length && existingData) {
      normalizeDataToState(languagesData);
    }

  }, [languagesData, existingData, onLangChange]);


  const getErrorMessage = (id, field) => {
    const errorKey = `languages.${id}.${field}`;
    return errors[errorKey];
  };

  const normalizeDataToState = (data) => {
    if(data.length > 0) {
      const languagesTemp = {};
  
      data.forEach(obj => {
          languagesTemp[obj.language_id] = obj;
      });
  
      setLanguagesData(languagesTemp);
      setNormalizedData(true);
    }
  };

  const handleInputChange = (langId, field, fieldValue) => {
    if(Object.keys(languagesData).length === 0 && !normalizedData)  {
      setLanguagesData(() => {
        const updatedData = {};

        updatedData[langId] = {
            [field]: fieldValue
        };

        onLangChange(updatedData);
        return updatedData;
      });
    } else {
      setLanguagesData(prevData => {
          const updatedData = { ...prevData };
  
          updatedData[langId] = {
              ...updatedData[langId],
              [field]: fieldValue
          };
  
          onLangChange(updatedData);
          return updatedData;
      });
    }
  };

  return (
    <Tabs>
      <TabsHeader
      className="bg-transparent"
      indicatorProps={{
        className: "bg-gray-900/10 shadow-none !text-gray-900",
      }}>
        {languages.map(lang => (
          <Tab key={lang.slug} value={lang.name}>
            <div className="text-black">
              {lang.name} {lang.default ? ' (required)' : '' }
            </div>
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        {languages.map(lang => (
          <TabPanel key={lang.id} value={lang.name}>
            {errors.languages && 
                  <InputError message={errors.languages} className='mt-5'/>
                }
            {translationFields.map((field, index) => (
              <div key={lang.id+index}>
                {field.field == 'title' ? (
                  <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <InputLabel
                      htmlFor={field.field}
                      value={field.label}
                      className={`mt-1 block w-full ${getErrorMessage(lang.id, 'title') ? 'text-[red]' : ''}`}
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
                      <InputError message={getErrorMessage(lang.id, 'title')} className='mt-5'/>
                    }
                  </div>
                ): null}
                
                {field.field == 'description' ? (
                  <div key={`lang[${lang.id}][${lang.name}][${lang.id}]`} className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <InputLabel
                      htmlFor={field.field}
                      value={field.label}
                      className={`mt-1 block w-full ${getErrorMessage(lang.id, 'description') ? 'text-[red]' : ''}`}
                    />
                    <CKEditor
                      editor={ ClassicEditor }
                      data={languagesData && languagesData[lang.id] !== undefined && languagesData[lang.id].description ? languagesData[lang.id].description : ''}
                      required={lang.default ? true : false} 
                      name={`lang[${lang.id}][${field.field}]`}
                      onReady={ editor => {
                          
                      } }
                      onChange={(e, editor) => handleInputChange(lang.id, field.field, editor.getData())}
                    />
                    
                    {getErrorMessage(lang.id, 'description') && 
                      <InputError message={getErrorMessage(lang.id, 'description')} className='mt-5'/>
                    }
                  </div>
                ): null}

                {field.field == 'slug' ? (
                  <div key={`lang[${lang.id}][${lang.name}][${lang.id}]`} className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <InputLabel
                      htmlFor={field.field}
                      value={field.label}
                      className={`mt-1 block w-full ${getErrorMessage(lang.id, 'slug') ? 'text-[red]' : ''}`}
                    />
        
                    <TextInput
                        value={languagesData[lang.id] !== undefined && languagesData[lang.id].slug ? languagesData[lang.id].slug : ''}
                        id={`lang[${lang.id}][${lang.name}]`}
                        name={`lang[${lang.id}][${field.field}]`}
                        className={`mt-1 block w-full ${getErrorMessage(lang.id, 'slug') ? 'border-red-500' : ''}`}
                        autoComplete="title"
                        required={lang.default ? true : false}
                        onChange={(e) => handleInputChange(lang.id, field.field, e.target.value)}
                    />
                    
                    {getErrorMessage(lang.id, 'slug') && 
                      <InputError message={getErrorMessage(lang.id, 'slug')} className='mt-5'/>
                    }
                  </div>
                ): null}
              </div>

            ))}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  )

}
