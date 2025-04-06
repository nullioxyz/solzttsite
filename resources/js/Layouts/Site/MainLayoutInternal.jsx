import React from 'react';

import { SelectReferencesProvider } from '@/Contexts/SelectReferencesContext';
import { Head } from '@inertiajs/react';
import FixedMenu from '@/Components/Site/Nav/FixedMenu';

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

      <div className="flex flex-col min-h-screen">
        <header className="w-full mt-5">
          <FixedMenu languages={languages} defaultLang={defaultLang} currentLanguage={currentLanguage} social={social} />
        </header>
        <main>
          {children}
        </main>
      </div>
    </SelectReferencesProvider>
  )
}