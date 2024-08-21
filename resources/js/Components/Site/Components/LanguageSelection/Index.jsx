
import React from 'react';
import { useState } from 'react';

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


export default function LanguageSelection({ languages, defaultLang }) {
  
  const [langSelectOpen, setlangSelectOpen] = React.useState(false);
  const handleLangSelectOpen = () => setlangSelectOpen((cur) => !cur);
  const [currentLanguage, setCurrentLanguage] = useState('pt-BR');

  const { t } = useTranslation();

  return (
    <div className="flex ml-auto mr-2 cursor-pointer">
      <Button onClick={handleLangSelectOpen} className='bg-transparent border-none shadow-none hover:border-none hover:shadow-none'>
        <div className='flex space-x-4 items-center'>

          {defaultLang.slug === 'pt' && (
            <>
              <BR title={defaultLang.name} className='w-8' />
              <span className='normal-case'>{defaultLang.name}</span>
            </>
          )}

          {defaultLang.slug === 'it' && (
            <>
              <IT title={defaultLang.name} className='w-8' />
              <span className='normal-case'>{defaultLang.name}</span>
            </>
          )}

          {defaultLang.slug === 'en' && (
            <>
              <GB title={defaultLang.name} className='w-8' />
              <span className='normal-case'>{defaultLang.name}</span>
            </>
          )}
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
            <Typography variant="h5">
              {t('select_lang')}
            </Typography>
          </div>

          <CardBody className="flex flex-col gap-4">
            {languages.map((lang, index) => (
              <div key={index}>
                {lang.slug === 'pt' && (
                  <Button
                    variant="text"
                    fullWidth
                    className={`text-black bg-white hover:bg-gray-100 ${currentLanguage === 'pt-BR' ? 'border-2 border-[#7c8f77]' : ''}`}
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
                    className={`text-black bg-white hover:bg-gray-100 ${currentLanguage === 'it' ? 'border-2 border-[#7c8f77]' : ''}`}
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
                    className={`text-black bg-white hover:bg-gray-100 ${currentLanguage === 'en' ? 'border-2 border-[#7c8f77]' : ''}`}
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