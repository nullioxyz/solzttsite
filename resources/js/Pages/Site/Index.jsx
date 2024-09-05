import React, { lazy, Suspense } from 'react';

import Nav from '@/Components/Site/Nav/Index';
import Highlight from '@/Components/Site/Highlight/Index';
import About from '@/Components/Site/About/About';
import { Spinner } from "@material-tailwind/react";
import Book from '@/Components/Site/Book/Book';
import How from '@/Components/Site/How/How';
import { SelectReferencesProvider } from '@/Contexts/SelectReferencesContext';

const AvailableDesign = lazy(() => import('@/Components/Site/AvailableDesign/AvailableDesign'))
const Works = lazy(() => import('@/Components/Site/Works/Works'));


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
  currentLanguage
}) {
  return (

    <SelectReferencesProvider>
      <div className="flex flex-col min-h-screen text-white bg-[#7c8f77]">
        <header className="w-full mt-5">
          <Nav languages={languages} defaultLang={defaultLang} currentLanguage={currentLanguage} />
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