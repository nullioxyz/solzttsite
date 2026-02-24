import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import i18n from './i18n';

import React from 'react';

let root = null;

function InertiaAppWrapper({ App, props }) {
  return (
    <>
      <App {...props} />
    </>
  );
}

createInertiaApp({
  title: (title) => {
    const base = 'Solztt';
    if (!title) return base;
    return title.includes(base) ? title : `${title} | ${base}`;
  },
  resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
  setup({ el, App, props }) {
    const syncLanguage = (url) => {
      const candidate = String(url || window.location.pathname)
        .split('/')
        .filter(Boolean)[0];
      const nextLocale = ['pt', 'it', 'en'].includes(candidate) ? candidate : 'en';

      if (i18n.language !== nextLocale) {
        i18n.changeLanguage(nextLocale);
      }

      document.documentElement.lang = nextLocale;
    };

    syncLanguage(window.location.pathname);

    if (!window.__solzttI18nSyncBound) {
      document.addEventListener('inertia:navigate', (event) => {
        syncLanguage(event?.detail?.page?.url || window.location.pathname);
      });
      window.__solzttI18nSyncBound = true;
    }

    if (!root) {
      root = createRoot(el);
    }

    root.render(<InertiaAppWrapper App={App} props={props} />);
  },
  progress: {
    color: '#511e24',
    delay: 2500,
    showSpinner: true
  },
});
