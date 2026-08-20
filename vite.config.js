import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import { bunny } from 'laravel-vite-plugin/fonts';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.jsx'],
            refresh: true,
            fonts: [
                bunny('Inter', {
                    weights: [400, 500, 600],
                    optimizedFallbacks: false
                }),
                bunny('Plus Jakarta Sans', {
                    weights: [700],
                    optimizedFallbacks: false
                }),
            ],
        }),
        react(),
        tailwindcss(),
    ],
    server: {
        // host: '0.0.0.0',
        // cors: true,
        // hmr: {
        //     host: '192.168.0.5', // IP laptop coding
        // },
        // allowedHosts: true,
        watch: {
            ignored: ['**/storage/framework/views/**'],
        },
    },
});
