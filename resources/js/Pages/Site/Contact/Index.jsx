import React, { lazy, Suspense } from 'react';

import Book from '@/Components/Site/Book/Book';

import MainLayout from '@/Layouts/Site/MainLayout';


export default function Index({
  consideration,
  languages,
  defaultLang,
  currentLanguage,
  social,
  metatags
}) {
  return (

    <MainLayout languages={languages} defaultLang={defaultLang} social={social} metatags={metatags} currentLanguage={currentLanguage}>
        <Book
            consideration={consideration}
            currentLanguage={currentLanguage}
        />
    </MainLayout>
  )
}