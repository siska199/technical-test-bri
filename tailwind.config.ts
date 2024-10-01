import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/_components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/_lib/**/*.{js,ts,jsx,tsx,mdx}',
    './src/_styles/**/*.{js,ts,jsx,tsx,mdx}',
    './src/_store/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '700',
      bold: '900',
    },
    fontSize: {
      'heading-05': '1.875rem', // 30px
      'heading-04': '2.25rem', // 36px
      'heading-03': '3rem', // 48px
      'heading-02': '3.75rem', // 60px
      'heading-01': '4.5rem', // 72px

      'body-tiny': ['0.625rem', { lineHeight: '0.625rem' }], // 10px
      'body-small': ['0.75rem', { lineHeight: '0.85rem' }], // 12px
      'body-base': ['0.875rem', { lineHeight: '0.875rem' }], // 14px
      'body-medium': ['1rem', { lineHeight: '1rem' }], // 16px
      'body-large': ['1.125rem', { lineHeight: '1.125rem' }], // 18px
      'body-xl': ['1.25rem', { lineHeight: '1.25rem' }], // 20px
      'body-2xl': ['1.5rem', { lineHeight: '1.5rem' }], // 24px
      'body-3xl': ['1.75rem', { lineHeight: '1.75rem' }], // 28px
    },
    spacing: {
      '0': '0px',
      px: '1px',
      '0.5': '0.125rem',
      '1': '0.25rem',
      '2': '0.50rem',
      '3': '0.75rem',
      '4': '1rem',
      '5': '1.25rem',
      '6': '1.5rem',
      '7': '1.75rem',
      '8': '2rem',
      '9': '2.25rem',
      '10': '2.5rem',
      '11': '2.75rem',
      '12': '3rem',
      '14': '3.5rem',
      '16': '4rem',
      '20': '5rem',
      '24': '6rem',
      '28': '7rem',
      '32': '8rem',
      '36': '9rem',
      '40': '10rem',
      '48': '12rem',
      '52': '13rem',
      '56': '14rem',
      '60': '15rem',
      '64': '16rem',
      '72': '18rem',
      '80': '20rem',
      '96': '24rem',
    },
    extend: {
      borderColor: {
        DEFAULT: '#e5e7eb',
      },
      borderWidth: {
        DEFAULT: '1px',
      },
      colors: {
        black: '#000000',
        white: '#FFFFFF',
        disabled: '#f9fafb',
        transparent: 'transparent',
        background: '#F5F6FA',
        gray: {
          '50': '#f9fafb',
          '100': '#f3f4f6',
          '200': '#e5e7eb',
          '300': '#d1d5db',
          '400': '#9ca3af',
          '500': '#6b7280',
          '600': '#4b5563',
          '700': '#374151',
          '800': '#1F2937',
          '900': '#111827',
          DEFAULT: '#6b7280',
        },
        primary: {
          '50': '#f4f3ff',
          '100': '#ece9fe',
          '200': '#dad5ff',
          '300': '#beb4fe',
          '400': '#9e89fc',
          '500': '#7f59f9',
          '600': '#6226ef',
          '700': '#5f25dc',
          '800': '#4f1eb9',
          '900': '#431b97',
          '950': '#280e67',
          DEFAULT: '#6226ef',
        },
        success: {
          '50': '#effefa',
          '100': '#c7fff1',
          '200': '#90ffe2',
          '300': '#51f7d3',
          '400': '#1de4bf',
          '500': '#04c8a6',
          '600': '#00b69b',
          '700': '#05806f',
          '800': '#0a655a',
          '900': '#0d544b',
          '950': '#00332f',
          DEFAULT: '#00b69b',
        },
        warning: {
          '50': '#fff6ed',
          '100': '#ffecd4',
          '200': '#ffd4a9',
          '300': '#ffa756',
          '400': '#fe8c39',
          '500': '#fc6b13',
          '600': '#ed5009',
          '700': '#c53a09',
          '800': '#9c2f10',
          '900': '#7e2910',
          '950': '#441206',
          DEFAULT: '#ed5009',
        },
        error: {
          '50': '#fff2f1',
          '100': '#ffe2df',
          '200': '#ffcac5',
          '300': '#ffa69d',
          '400': '#ff7264',
          '500': '#ff4533',
          '600': '#ef3826',
          '700': '#c81e0d',
          '800': '#a51c0f',
          '900': '#891e13',
          '950': '#4b0a04',
          DEFAULT: '#ef3826',
        },
        blue: {
          '50': '#F0F6FF',
          '100': '#DCEBFE',
          '200': '#7AB7FF',
          '300': '#50A1FF',
          '400': '#2E88F6',
          '500': '#357AEA',
          '600': '#1055EA',
          '700': '#1347CC',
          '800': '#0A318C',
          '900': '#1D223F',
          DEFAULT: '#357AEA',
        },
      },
    },
  },
  plugins: [],
};
export default config;
