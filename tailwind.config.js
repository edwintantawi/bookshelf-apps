/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['index.html', 'scripts/**/*.js'],
  theme: {
    fontFamily: { sans: ['Open Sans', 'sans-serif'] },
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
};
