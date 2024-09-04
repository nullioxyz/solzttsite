import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import './i18n';

import React, { useState, useEffect } from 'react';

import Loader from './Components/Loader/Index';

const appName = 'Solztt';

function InertiaAppWrapper({ App, props }) {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [fadingOut, setFadingOut] = useState(false);


  const { initialPage } = props;

  const shouldShowLoader = initialPage.component === 'Site/Index';

  useEffect(() => {
    if (shouldShowLoader) {
      setLoading(true);
      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(interval);
            setFadingOut(true);
            setTimeout(() => {
              setLoading(false);
              setFadingOut(false);
            }, 1000);
            return 100;
          }
          return prevProgress + 1;
        });
      }, 30);

      return () => clearInterval(interval);
    } else {
      setLoading(false);
    }
  }, [shouldShowLoader]);

  return (
    <>
      {loading ? (
        <Loader progress={progress}  fadingOut={fadingOut} />
      ) : (
        <App {...props} />
      )}
    </>
  );
}


createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
  setup({ el, App, props }) {
    const root = createRoot(el);

    // Renderizando o InertiaAppWrapper, que agora gerencia o estado de loading
    root.render(<InertiaAppWrapper App={App} props={props} />);
  },
  progress: {
    color: 'red',
    delay: 2500,
    showSpinner: true
  },
});
