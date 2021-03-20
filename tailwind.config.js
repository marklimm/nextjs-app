module.exports = {
  //  adding this line per https://tailwindcss.com/docs/guides/nextjs#configure-tailwind-to-remove-unused-styles-in-production
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],

  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
