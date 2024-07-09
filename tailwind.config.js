/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/**/*.{js,jsx,ts,tsx}",
];

export const theme = {
  extend: {
    keyframes: {
      added: {
        '0%, 100%': { backgroundColor: '#ffffff' },
        '10%': { backgroundColor: '#86efac' },
      },
      removed: {
        '0%, 100%': { backgroundColor: '#ffffff' },
        '10%': { backgroundColor: '#fcd34d' },
      }
    },
    animation: {
      added: 'added 1s ease-in-out',
      removed: 'removed 1s ease-in-out',
    }
  },
};

export const plugins = [];
