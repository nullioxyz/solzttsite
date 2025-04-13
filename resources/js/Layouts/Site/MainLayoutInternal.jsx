import React from 'react';

import { SelectReferencesProvider } from '@/Contexts/SelectReferencesContext';
import { Head } from '@inertiajs/react';
import FixedMenu from '@/Components/Site/Nav/FixedMenu';
import Footer from '@/Components/Site/Footer/Index';

const logoUrl = `${window.location.origin}/images/logo.jpg`;

const  stripHtmlTags = (html) => {
  return html.replace(/<[^>]*>/g, '');
}

export default function MainLayoutInternal({
  children,
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