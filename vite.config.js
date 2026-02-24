import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    laravel({
      input: 'resources/js/app.jsx',
      refresh: true,
    }),
    react(),
  ],
  build: {
    sourcemap: false,
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;

          if (id.includes('ckeditor') || id.includes('@ckeditor')) return 'vendor-ckeditor';
          if (id.includes('framer-motion') || id.includes('animejs') || id.includes('react-beautiful-dnd')) return 'vendor-motion';
          if (id.includes('sweetalert2') || id.includes('canvas-confetti')) return 'vendor-ui-effects';
          if (id.includes('@heroicons') || id.includes('@material-tailwind')) return 'vendor-ui-kit';
          if (id.includes('i18next') || id.includes('react-i18next')) return 'vendor-i18n';

          return 'vendor';
        },
      },
    },
  },
});
