import React, { Suspense } from 'react';

import AfterCare from '@/Components/Site/AfterCare/AfterCare';
import MainLayout from '@/Layouts/Site/MainLayout';

export default function Index({
  institucional,
  languages,
  defaultLang,
  currentLanguage,
  social,
  metatags,
  metaImage
}) {
  return (
    <MainLayout languages={languages} defaultLang={defaultLang} social={social} metatags={metatags} currentLanguage={currentLanguage} metaImage={institucional?.media ? institucional : metaImage}>
        <Suspense>
          <AfterCare
            institucional={institucional}
          />
        </Suspense>
    </MainLayout>
  )
}