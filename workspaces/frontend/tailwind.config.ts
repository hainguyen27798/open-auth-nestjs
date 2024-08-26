import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                default: 'var(--color-default)',
            },
        },
    },
    important: 'html',
    corePlugins: {
        container: false,
    },
    plugins: [
        function ({ addComponents }: any) {
            addComponents({
                '.container': {
                    width: '100%',
                    '@screen sm': {
                        maxWidth: '640px',
                    },
                    '@screen md': {
                        maxWidth: '768px',
                    },
                    '@screen lg': {
                        maxWidth: '1024px',
                    }
                },
            });
        },
    ],
};
export default config;
