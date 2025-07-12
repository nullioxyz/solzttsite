import React, { Suspense } from 'react';

import { Spinner } from "@material-tailwind/react";
import MainLayout from '@/Layouts/Site/MainLayout';
import Works from '@/Components/Site/Works/Works';

export default function Index({
  institucional,
  appointmentTexts,
  appointmentWarning,
  requestSectionText,
  criativeProcess,
  consideration,
  paymentMethods,
  languages,
  defaultLang,
  currentLanguage,
  social,
  metatags,
  portfolio
}) {
  return (

    <MainLayout languages={languages} defaultLang={defaultLang} social={social} metatags={metatags} currentLanguage={currentLanguage}>
        <Suspense fallback={<Spinner />}>
          <Works
            portfolio={portfolio}
            institucional={institucional}
            appointmentTexts={appointmentTexts}
            appointmentWarning={appointmentWarning}
            requestSectionText={requestSectionText}
            criativeProcess={criativeProcess}
            consideration={consideration}
            paymentMethods={paymentMethods}
            currentLanguage={currentLanguage}
          />
        </Suspense>
    </MainLayout>
  )
}