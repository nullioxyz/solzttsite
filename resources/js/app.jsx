import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import './i18n';

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
  resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
  setup({ el, App, props }) {
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
