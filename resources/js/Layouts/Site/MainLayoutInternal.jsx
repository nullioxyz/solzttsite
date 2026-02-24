import React from 'react';

import { SelectReferencesProvider } from '@/Contexts/SelectReferencesContext';
import FixedMenu from '@/Components/Site/Nav/FixedMenu';
import Footer from '@/Components/Site/Footer/Index';

export default function MainLayoutInternal({
  children,
  languages,
  defaultLang,
  currentLanguage,
  social
}) {
  return (

    <SelectReferencesProvider>
      <div className="min-h-screen flex flex-col">
        <header className="w-full mt-5">
          <FixedMenu languages={languages} defaultLang={defaultLang} currentLanguage={currentLanguage} social={social} />
        </header>
        
        <main className="flex-grow">
          {children}
        </main>
        
        <Footer social={social} />

      </div>
    </SelectReferencesProvider>
  )
}
