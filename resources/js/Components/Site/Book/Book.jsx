import React from 'react';
import Form from './Form';
import { useTranslation } from 'react-i18next';
import { Link } from '@inertiajs/react';

export default function Book({ requestSectionText, criativeProcess, consideration, paymentMethod, currentLanguage }) {
  const { t } = useTranslation();

  const requestSectionTextTranslation = requestSectionText.translation ?? requestSectionText.default_translation;
  const criativeProcessTranslation = criativeProcess.translation ?? criativeProcess.default_translation;
  const considerationTranslation = consideration.translation ?? consideration.default_translation;
  const paymentMethodTranslation = paymentMethod.translation ?? paymentMethod.default_translation;

  return (
    <section id="book" className="flex flex-col justify-between h-auto mx-auto p-5">
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
              criativeProcessTranslation={criativeProcessTranslation}
              considerationTranslation={considerationTranslation}
              paymentMethodTranslation={paymentMethodTranslation}
              />
          </div>
        </div>
      </div>
    </section>

  );
}