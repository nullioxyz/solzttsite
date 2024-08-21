import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(Backend) // Usar o backend para carregar traduções
  .use(LanguageDetector) // Detectar a língua do navegador
  .use(initReactI18next) // Passa o i18n para react-i18next
  .init({
    fallbackLng: 'en', // Língua padrão se a linguagem desejada não for encontrada
    debug: false, // Habilitar debug no console

    interpolation: {
      escapeValue: false, // React já faz escaping
    },

    backend: {
      loadPath: '/translations', // Caminho para carregar traduções
    },
  });

export default i18n;
