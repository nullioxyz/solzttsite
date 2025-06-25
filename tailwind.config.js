import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

const withMT = require("@material-tailwind/react/utils/withMT");

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
        "./node_modules/@material-tailwind/react/components/**/*.{js,jsx,ts,tsx}",
        "./node_modules/@material-tailwind/react/theme/**/*.{js,jsx,ts,tsx}",
    ],

    theme: {
        extend: {
            fontFamily: {
                solztt: ['Solztt'],
                solztt2: ['Solztt2'],
                MontSerratMedium: ['MontSerratMedium'],
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
                MontserratLight: ['MontSerratLight', 'sans-serif'],
            },
            screens: {
                'xs': '480px',
                'custom': '360px'
              },
        },
    },

    plugins: [forms],
};
