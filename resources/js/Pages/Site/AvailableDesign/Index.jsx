import React, { lazy, Suspense } from 'react';

import { Spinner } from "@material-tailwind/react";
import MainLayout from '@/Layouts/Site/MainLayout';
import AvailableDesign from '@/Components/Site/AvailableDesign/AvailableDesign';

export default function Index({
  languages,
  defaultLang,
  currentLanguage,
  social,
  metatags,
}) {
  return (
    <MainLayout languages={languages} defaultLang={defaultLang} social={social} metatags={metatags} currentLanguage={currentLanguage}>
        <Suspense fallback={<Spinner />}>
            <AvailableDesign />
        </Suspense>
    </MainLayout>
  )
}