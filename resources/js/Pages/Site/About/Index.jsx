import React, { lazy, Suspense } from 'react';

import About from '@/Components/Site/About/About';
import { Spinner } from "@material-tailwind/react";
import MainLayout from '@/Layouts/Site/MainLayout';
import MainLayoutInternal from '@/Layouts/Site/MainLayoutInternal';

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
          <About
            portfolio={portfolio}
            institucional={institucional}
            appointmentTexts={appointmentTexts}
            appointmentWarning={appointmentWarning}
            requestSectionText={requestSectionText}
            criativeProcess={criativeProcess}
            consideration={consideration}
            paymentMethods={paymentMethods}
          />
        </Suspense>
    </MainLayout>
  )
}