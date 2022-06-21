/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['index.html', 'scripts/**/*.js'],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
};
