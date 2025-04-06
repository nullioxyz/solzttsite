import React, { lazy, Suspense } from 'react';

import { Spinner } from "@material-tailwind/react";
import MainLayout from '@/Layouts/Site/MainLayout';
import AvailableDesign from '@/Components/Site/AvailableDesign/AvailableDesign';
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
    <MainLayoutInternal languages={languages} defaultLang={defaultLang} social={social} metatags={metatags} currentLanguage={currentLanguage}>
        <Suspense fallback={<Spinner />}>
            <AvailableDesign />
        </Suspense>
    </MainLayoutInternal>
  )
}