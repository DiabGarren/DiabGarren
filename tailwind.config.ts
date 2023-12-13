import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: {
          DEFAULT: '#00799f'
        },
        warning: {
          DEFAULT: '#ff0000'
        },
        green: {
          DEFAULT: '#028202',
        },
        blue: {
          dark: '#00799F',
          light: '#BFDEE8'
        }
      }
    },
  },
  plugins: [],
};
export default config;
