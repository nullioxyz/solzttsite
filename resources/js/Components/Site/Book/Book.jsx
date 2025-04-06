import React from 'react';
import { ReactTyped } from "react-typed";
import Form from './Form';
import { useTranslation } from 'react-i18next';

export default function Book({ requestSectionText, criativeProcess, consideration, paymentMethod, currentLanguage }) {
  const { t } = useTranslation();

  const requestSectionTextTranslation = requestSectionText.translation ?? requestSectionText.default_translation;
  const criativeProcessTranslation = criativeProcess.translation ?? criativeProcess.default_translation;
  const considerationTranslation = consideration.translation ?? consideration.default_translation;
  const paymentMethodTranslation = paymentMethod.translation ?? paymentMethod.default_translation;


  return (
    <section id="book" className="flex flex-col justify-between h-auto mx-auto p-5">
      <div className="max-w-[1240px] mx-auto">
        <div className="lg:text-left sm:text-center">
          <div className="title uppercase">
            <ReactTyped className='text-5xl tracking-tight montSerratBold text-black' startWhenVisible showCursor={false} strings={[`<h2>${t('requestatatto')}</h2>`]} typeSpeed={40} />
          </div>
        </div>

        <div>
          <div className="grid lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-1">
            <Form currentLanguage={currentLanguage}/>
          </div>
        </div>
      </div>
    </section>

  );
}