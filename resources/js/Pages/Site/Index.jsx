import React, { lazy } from 'react';

import MainLayout from '@/Layouts/Site/MainLayout';
import AboutHome from '@/Components/Site/About/AboutHome';

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

    <MainLayout languages={languages} defaultLang={defaultLang} social={social} metatags={metatags} currentLanguage={currentLanguage} metaImage={metaImage}>
      <main>
        <AboutHome institucional={institucional}/>
      </main>
    </MainLayout>
  )
}