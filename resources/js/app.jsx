import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import './i18n';

import React, { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import Loader from './Components/Loader/Index';

const appName = meta.env.VITE_APP_NAME || 'Laravel';

function InertiaAppWrapper({ App, props }) {
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const start = (event) => {
            setLoading(true);
            setProgress(event.detail.progress?.percentage || 0);
        };
        const finish = () => {
            setLoading(false);
            setProgress(0);
        };
        const progressHandler = (event) => {
            setProgress(event.detail.progress?.percentage || 0);
        };

        Inertia.on('start', start);
        Inertia.on('progress', progressHandler);
        Inertia.on('finish', finish);

        return () => {
            Inertia.off('start', start);
            Inertia.off('progress', progressHandler);
            Inertia.off('finish', finish);
        };
    }, []);

    return (
        <>
            {loading && <Loader progress={progress} />} {/* Passa a porcentagem para o Loader */}
            <App {...props} />
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
