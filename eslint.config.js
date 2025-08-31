// @ts-check
import eslintJs from '@eslint/js'
import eslintReact from '@eslint-react/eslint-plugin'
import tseslint from 'typescript-eslint'

export default tseslint.config({
    ignores: ['.storybook/**'],
    files: ['**/*.ts', '**/*.tsx'],
    settings: {
        'react-x': {
            version: 'detect', // React version for analysis
            // ...other properties
        },
    },
    // Extend recommended rule sets from:
    // 1. ESLint JS's recommended rules
    // 2. TypeScript ESLint recommended rules
    // 3. ESLint React's recommended-typescript rules
    extends: [
        eslintJs.configs.recommended,
        tseslint.configs.recommended,
        eslintReact.configs['recommended-typescript'],
    ],

    // Configure language/parsing options
    languageOptions: {
        // Use TypeScript ESLint parser for TypeScript files
        parser: tseslint.parser,
        parserOptions: {
            // Enable project service for better TypeScript integration
            projectService: true,
        },
    },

    // Custom rule overrides (modify rule levels or disable rules)
    rules: {
        '@eslint-react/no-missing-key': 'warn',
    },
})
