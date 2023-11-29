import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import laravel from 'laravel-vite-plugin';

const env = process.env.NODE_ENV || 'development';
export default defineConfig({
    esbuild: {
        // Keep names on classes during minification to preserve error names for type guards
        keepNames: true,
    },
    plugins: [
        env === 'test' ? {} : laravel({
            input: ['resources/front/main.ts'],
            refresh: true,
        }),
        vue({
            base: null,
            includeAbsolute: false,
        }),
    ],
    resolve: {
        alias: {
            '@': '/resources/front',
            '@styles': '/resources/styles',
            '@assets': '/resources/assets',
        }
    },
    server: {
        https: env === 'production',
        hmr: {
            host: 'template.docker',
        },
        host: '0.0.0.0',
        port: 5178
    },
    test: {
        environment: 'jsdom',
        include: ['resources/front/**/*.test.ts'],
        setupFiles: ['./vitest.setup.ts'],
    },
});
