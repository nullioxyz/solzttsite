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
      <div className="max-w-[1240px] mx-auto mt-44">
        <div className="lg:text-left sm:text-center custom:text-center md:text-center">
          <div className="title uppercase">
            <ReactTyped className='text-5xl tracking-tight montSerratBold text-black' startWhenVisible showCursor={false} strings={[`<h2>${t('requestatatto')}</h2>`]} typeSpeed={40} />
          </div>
        </div>

        <div className="flex">
          <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1">
            <div className="information m-5 lg:mt-20 md:mt-10 sm:mt-5">
              {requestSectionText && (
                <div className="text mt-10 text-[20px] sm:mb-15 md:mb-15">
                  <div className='text-justify times' dangerouslySetInnerHTML={{ __html: requestSectionTextTranslation.description }} />
                </div>
              )}

              {criativeProcess && (
                <>
                  <div className="title uppercase mt-20">
                    <h2 className='text-[37px] tracking-tighter montSerratMedium text-black'>{criativeProcessTranslation.title}</h2>
                  </div>

                  <div className="text mt-10 text-[20px] sm:mb-15 md:mb-15">
                    <div className='text-justify times' dangerouslySetInnerHTML={{ __html: criativeProcessTranslation.description }} />
                  </div>
                </>
              )}

              {consideration && (
                <>
                  <div className="title uppercase mt-20">
                    <h2 className='text-[37px] tracking-tighter montSerratMedium text-black'>{considerationTranslation.title}</h2>
                  </div>

                  <div className="text mt-10 text-[20px] sm:mb-15 md:mb-15">
                    <div className='text-justify times' dangerouslySetInnerHTML={{ __html: considerationTranslation.description }} />
                  </div>
                </>
              )}

              {paymentMethod && (
                <>
                  <div className="title uppercase mt-20">
                    <h2 className="text-[37px] tracking-tighter montSerratMedium text-black">
                      {paymentMethodTranslation.title}
                    </h2>
                  </div>

                  <div className="text mt-10 text-[20px] sm:mb-15 md:mb-15">
                    <div className="text-justify times" dangerouslySetInnerHTML={{ __html: paymentMethodTranslation.description }} />
                  </div>
                </>
              )}

            </div>
            <Form currentLanguage={currentLanguage}/>
          </div>
        </div>
      </div>
    </section>

  );
}