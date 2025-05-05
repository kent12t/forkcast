/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      padding: {
        'safe': 'env(safe-area-inset-bottom, 0px)',
      },
      height: {
        'screen-safe': 'calc(100vh - env(safe-area-inset-bottom, 0px))',
      },
    },
  },
  plugins: [],
} 