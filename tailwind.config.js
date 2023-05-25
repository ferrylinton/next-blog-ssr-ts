const { blackA, mauve, violet } = require('@radix-ui/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        sidebar: "300px auto", //for sidebar layout
      },
      gridTemplateRows: {
        header: "64px auto", //for the navbar layout
      },
      colors: {
        ...blackA,
        ...mauve,
        ...violet,
      },
      fontFamily: {
        'orbitron': ['Orbitron', 'sans-serif'],
        'righteous': ['Righteous', 'cursive'],
        'alkatra': ['Alkatra', 'cursive'],
      },
      backgroundSize: {
        'size-200': '200% 200%',
      },
      backgroundPosition: {
        'pos-0': '0% 0%',
        'pos-100': '100% 100%',
      },
    },
  },
  images: {
    domains: ['images.unsplash.com'],
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
