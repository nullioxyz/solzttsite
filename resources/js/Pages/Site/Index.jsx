import React, { lazy, Suspense } from 'react';

import { Spinner } from "@material-tailwind/react";
import Book from '@/Components/Site/Book/Book';
import How from '@/Components/Site/How/How';
import MainLayout from '@/Layouts/Site/MainLayout';
import AboutHome from '@/Components/Site/About/AboutHome';

const AvailableDesign = lazy(() => import('@/Components/Site/AvailableDesign/AvailableDesignHome'))
const Works = lazy(() => import('@/Components/Site/Works/WorksHome'));

const logoUrl = `${window.location.origin}/images/logo.jpg`;

export default function Index({
  institucional,
  languages,
  defaultLang,
  currentLanguage,
  social,
  metatags
}) {
  return (

    <MainLayout languages={languages} defaultLang={defaultLang} social={social} metatags={metatags} currentLanguage={currentLanguage}>
      <main>
        <AboutHome institucional={institucional}/>

      </main>
    </MainLayout>
  )
}