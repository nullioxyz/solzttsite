import React from 'react';
import Form from './Form';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { fileUrl } from '@/helpers/images';

export default function Book({ consideration, currentLanguage }) {
  const [loaded, setLoaded] = useState(false);

  const { t } = useTranslation();

  const considerationTranslation =
    consideration?.translation ?? consideration?.default_translation ?? {};
  const mediaItems = Array.isArray(consideration?.media) ? consideration.media : [];
  const hasMedia = mediaItems.length > 0;

  return (
    <section id="book" className="flex flex-col justify-between h-auto mx-auto">
      {hasMedia && (
        <div className="w-full relative aspect-[5/2] overflow-hidden">
          {!loaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
          )}
          <picture className="w-full">
            <img
              src={fileUrl(mediaItems[0]?.uuid, { locale: 'lang', size: 'lg' })}
              alt={considerationTranslation.title || 'image'}
              loading="lazy"
              decoding="async"
              draggable={false}
              onLoad={() => setLoaded(true)}
              className={`w-full object-cover h-full transition-opacity duration-500 ${
                loaded ? "opacity-100" : "opacity-0"
              }`}
            />
          </picture>
        </div>
      )}
    
      <div className="max-w-[1240px] mx-auto w-full xl:mt-5 lg:mt-5 md:mt-20 sm:mt-5 xs:mt-5 h-auto p-5">
        <div className="mb-10">
          <h1 className="text-[2.0rem] tracking-tight text-[#595954] lg:text-center xl:text-left md:text-center sm:text-center xs:text-center text-center">
            {t('requestatatto')}
          </h1>
        </div>

        <div>
          <div className="grid lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-1">
            <Form
              currentLanguage={currentLanguage}
              considerationTranslation={considerationTranslation}
              />
          </div>
        </div>
      </div>
    </section>

  );
}
