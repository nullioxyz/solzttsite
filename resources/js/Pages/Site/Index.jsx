import React, { lazy, Suspense } from 'react';

import Nav from '@/Components/Site/Nav/Index';
import Highlight from '@/Components/Site/Highlight/Index';
import About from '@/Components/Site/About/About';
import { Spinner } from "@material-tailwind/react";
import Book from '@/Components/Site/Book/Book';
import How from '@/Components/Site/How/How';
import { SelectReferencesProvider } from '@/Contexts/SelectReferencesContext';
import { Head } from '@inertiajs/react';

const AvailableDesign = lazy(() => import('@/Components/Site/AvailableDesign/AvailableDesign'))
const Works = lazy(() => import('@/Components/Site/Works/Works'));

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
  metatags
}) {
  return (

    <SelectReferencesProvider>
      <Head>
        <title>{metatags.translation ? metatags.translation.title : metatags.default_translation.title }</title>
        <meta name="description" content={stripHtmlTags(metatags.translation ? metatags.translation.description : metatags.default_translation.description) } />
        <meta name="keywords" content={metatags.translation ? metatags.translation.keywords : metatags.default_translation.keywords } />
        <meta property="og:title" content={metatags.translation ? metatags.translation.title : metatags.default_translation.title } />
        <meta property="og:description" content={stripHtmlTags(metatags.translation ? metatags.translation.description : metatags.default_translation.description) } />
        <meta property="og:image" content={logoUrl} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={window.location.href} />
      </Head>

      <div className="flex flex-col min-h-screen text-white bg-[#7c8f77]">
        <header className="w-full mt-5">
          <Nav languages={languages} defaultLang={defaultLang} currentLanguage={currentLanguage} social={social} />
        </header>

        <main>
          <Suspense fallback={<Spinner />}>
            <Highlight />
          </Suspense>

          <About
            institucional={institucional}
          />

          <Suspense fallback={<Spinner />}>
            <Works />
          </Suspense>

          <Suspense fallback={<Spinner />}>
            <AvailableDesign />
          </Suspense>

          <How
            texts={appointmentTexts}
            warning={appointmentWarning}
          />

          <Book
            requestSectionText={requestSectionText}
            criativeProcess={criativeProcess}
            consideration={consideration}
            paymentMethod={paymentMethods}
          />
        </main>
      </div>
    </SelectReferencesProvider>
  )
}