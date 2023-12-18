import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './app/rdpUtilities/**/*.{js,ts,jsx,tsx,md}'
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
          light: '#4be94b'
        },
        blue: {
          DEFAULT: '#00799F',
          light: '#BFDEE8'
        }
      },
      borderRadius: {
        DEFAULT: '5px',
        'md': '10px',
        'lr': '15px',
      }
    },
  },
  plugins: [],
};
export default config;
