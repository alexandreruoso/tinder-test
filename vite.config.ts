import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    test: {
        setupFiles: ['./src/test-setup.ts'],
        globals: true,
        environment: 'jsdom',
        coverage: {
            provider: 'v8',
            reporter: ['text', 'html'],
            include: ['src/**/*.ts', 'src/**/*.tsx'],

            // --- Updated Exclude Rules ---
            exclude: [
                // 1. All test files
                '**/*.test.ts',
                '**/*.test.tsx',

                // 2. All Storybook stories
                '**/*.stories.ts',
                '**/*.stories.tsx',

                // 3. Mock Service Worker configuration
                'src/mocks/**',

                // 4. Scripts folder at the project root
                'scripts/**',

                // 5. Public folder at the project root
                'public/**',

                // 5. Configuration and setup files that don't need testing
                'src/main.tsx',
                'src/vite-env.d.ts',
                'src/test-setup.ts',
                'src/types/**',
                'src/api/**',
                'playwright.config.ts',
                'e2e/**',
            ],
        },
    },
    build: {
        chunkSizeWarningLimit: 1000,
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ['react', 'react-dom'],
                    mui: ['@mui/material', '@mui/icons-material'],
                },
            },
        },
    },
})
