import React from 'react';
import Form from './Form';
import { useTranslation } from 'react-i18next';

export default function Book({ consideration, currentLanguage }) {
  const { t } = useTranslation();
  
  const considerationTranslation = consideration.translation ?? consideration.default_translation;

  return (
    <section id="book" className="flex flex-col justify-between xl:mt-20 lg:mt-20 md:mt-20 sm:mt-5 xs:mt-5 h-auto mx-auto p-5">
      <div className="max-w-[1240px] mx-auto w-full">

        <div className="mb-10">
          <h1 className="text-[2.0rem] tracking-tight text-[#595954] text-center sm:text-left">
          {t('requestatatto')}
          </h1>
        </div>

        <div>
          <div className="grid lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-1">
            <Form
              currentLanguage={currentLanguage}
              considerationTranslation={considerationTranslation}
              />
          </div>
        </div>
      </div>
    </section>

  );
}