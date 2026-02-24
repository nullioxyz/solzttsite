import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ['pt', 'it', 'en'],
    fallbackLng: 'en',
    debug: false,
    load: 'languageOnly',
    nonExplicitSupportedLngs: true,

    interpolation: {
      escapeValue: false,
    },

    detection: {
      order: ['path', 'htmlTag', 'cookie', 'navigator'],
      lookupFromPathIndex: 0,
      caches: [],
    },

    backend: {
      loadPath: '/{{lng}}/translations',
    },
  });

export default i18n;
