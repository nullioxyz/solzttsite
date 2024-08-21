import React from 'react';

import Nav from '@/Components/Site/Nav/Index';
import Highlight from '@/Components/Site/Highlight/Index';
import About from '@/Components/Site/About/About';
import Works from '@/Components/Site/Works/Works';
import AvailableDesign from '@/Components/Site/AvailableDesign/AvailableDesign';
import Book from '@/Components/Site/Book/Book';
import How from '@/Components/Site/How/How';

export default function Index({
  institucional,
  appointmentTexts,
  appointmentWarning,
  requestSectionText,
  criativeProcess,
  consideration,
  paymentMethods,
  languages,
  defaultLang
}) {
  
  
  return (


    <div className="flex flex-col min-h-screen text-white bg-[#7c8f77]">
      <header className="w-full mt-5">
        <Nav languages={languages} defaultLang={defaultLang}/>
      </header>

      <main>
        <Highlight />

        <About
          institucional={institucional}
        />

        <Works />

        <AvailableDesign />

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
  )
}