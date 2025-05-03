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
      <div className="w-[1240px] mx-auto">
        <div className="lg:text-left sm:text-center">
          <div className="title uppercase">
            <h1 className='text-6xl tracking-tight montSerratBold text-black'>{t('requestatatto')}</h1>
          </div>
        </div>

        <div className="lg:text-left sm:text-left custom:text-left md:text-left">
          <Link
            href="/"
            className="text inline-flex m-3 text-gray-600 hover:text-black transition"
          >
            {t('back_to_home')}
          </Link>
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