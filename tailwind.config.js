/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bilayers: {
          pink: '#F23EFF',
          magenta: '#D92CF9',
        },
      },
  },
},
  plugins: [],
}
