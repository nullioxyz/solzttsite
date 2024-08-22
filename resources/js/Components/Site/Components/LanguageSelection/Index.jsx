
import React from 'react';
import { useState } from 'react';
import axios from '@/Services/requests';

import GB from 'country-flag-icons/react/3x2/GB'
import BR from 'country-flag-icons/react/3x2/BR'
import IT from 'country-flag-icons/react/3x2/IT'

import {
  Button,
  Dialog,
  Card,
  CardBody,
  Typography
} from "@material-tailwind/react";

import { useTranslation } from 'react-i18next';
import CurrentLanguage from '../CurrentLanguage/Index';


export default function LanguageSelection({ languages, defaultLang, currentLanguage, textColor }) {
  
  const [langSelectOpen, setlangSelectOpen] = React.useState(false);
  const handleLangSelectOpen = () => setlangSelectOpen((cur) => !cur);
  const textColorDefault = textColor ?? 'text-white';

  const { t } = useTranslation();

  const handleSelectLanguage = async (lang) => {
    try {

      await axios.post(route('site.setLanguage'), { lang: lang });
      location.reload();

    } catch {

    }
  }

  return (
    <div className="flex ml-auto mr-2 cursor-pointer">
      <Button onClick={handleLangSelectOpen} className='bg-transparent border-none shadow-none hover:border-none hover:shadow-none'>
        <div className={`flex space-x-4 items-center ${textColorDefault}`}>
          <CurrentLanguage defaultLang={defaultLang} currentLanguage={currentLanguage} />
        </div>
      </Button>

      <Dialog
        size="xs"
        open={langSelectOpen}
        handler={handleLangSelectOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <div className="flex border-b border-gray-200 justify-center items-center p-4">
            <h5 className='MontSerratMedium font-bold'>{t('select_lang')}</h5>
          </div>

          <CardBody className="flex flex-col gap-4">
            {languages.map((lang, index) => (
              <div key={index}>
                {lang.slug === 'pt' && (
                  <Button
                    variant="text"
                    fullWidth
                    className={`text-black MontSerratMedium bg-white hover:bg-gray-100 ${currentLanguage.slug === 'pt' ? 'border-2 border-[#7c8f77]' : ''}`}
                    onClick={() => handleSelectLanguage(lang.slug)}
                  >
                    <div className='flex space-x-4 items-center'>
                      <BR title={t('brazilian')} className='w-8' />
                      <span className='normal-case'>{lang.name}</span>
                    </div>
                  </Button>
                )}

                {lang.slug === 'it' && (
                  <Button
                    key={index}
                    variant="text"
                    fullWidth
                    className={`text-black bg-white hover:bg-gray-100 ${currentLanguage.slug === 'it' ? 'border-2 border-[#7c8f77]' : ''}`}
                    onClick={() => handleSelectLanguage(lang.slug)}
                  >
                    <div className='flex space-x-4 items-center'>
                      <IT title={t('italian')} className='w-8' />
                      <span className='normal-case'>{lang.name}</span>
                    </div>
                  </Button>
                )}

                {lang.slug === 'en' && (
                  <Button
                    key={index}
                    variant="text"
                    fullWidth
                    className={`text-black bg-white hover:bg-gray-100 ${currentLanguage.slug === 'en' ? 'border-2 border-[#7c8f77]' : ''}`}
                    onClick={() => handleSelectLanguage(lang.slug)}
                  >
                    <div className='flex space-x-4 items-center'>
                      <GB title={t('english')} className='w-8' />
                      <span className='normal-case'>{lang.name}</span>
                    </div>
                  </Button>
                )}
              </div>
            ))}
          </CardBody>
        </Card>
      </Dialog>
    </div>
  )
}