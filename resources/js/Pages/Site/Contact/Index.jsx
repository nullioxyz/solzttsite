import React, { lazy, Suspense } from 'react';

import Nav from '@/Components/Site/Nav/Index';
import Highlight from '@/Components/Site/Highlight/Index';
import About from '@/Components/Site/About/About';
import { Spinner } from "@material-tailwind/react";
import Book from '@/Components/Site/Book/Book';
import How from '@/Components/Site/How/How';
import MainLayout from '@/Layouts/Site/MainLayout';
import { SelectReferencesProvider } from '@/Contexts/SelectReferencesContext';
import { Head } from '@inertiajs/react';
import Works from '@/Components/Site/Works/Works';
import MainLayoutInternal from '@/Layouts/Site/MainLayoutInternal';

const AvailableDesign = lazy(() => import('@/Components/Site/AvailableDesign/AvailableDesign'))
const logoUrl = `${window.location.origin}/images/logo.jpg`;

const  stripHtmlTags = (html) => {
  return html.replace(/<[^>]*>/g, '');
}

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
        <Book
            requestSectionText={requestSectionText}
            criativeProcess={criativeProcess}
            consideration={consideration}
            paymentMethod={paymentMethods}
            currentLanguage={currentLanguage}
        />
    </MainLayout>
  )
}