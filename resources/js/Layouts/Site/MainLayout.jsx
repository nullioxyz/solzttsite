import React from 'react';

import Nav from '@/Components/Site/Nav/Index';
import { SelectReferencesProvider } from '@/Contexts/SelectReferencesContext';
import { Head } from '@inertiajs/react';
import Footer from '@/Components/Site/Footer/Index';
import { fileUrl } from '@/helpers/images';

const  stripHtmlTags = (html) => {
  return html.replace(/<[^>]*>/g, '');
}

export default function MainLayout({
  children,
  languages,
  defaultLang,
  currentLanguage,
  social
}) {

  return (
    <SelectReferencesProvider>

      <div className="flex flex-col min-h-screen bg-white">
        <header className="w-full mt-5">
          <Nav languages={languages} defaultLang={defaultLang} currentLanguage={currentLanguage} social={social} />
        </header>

        <main className="flex-grow">
          {children}
        </main>
        
        <Footer social={social} />
      </div>
    </SelectReferencesProvider>
  )
}