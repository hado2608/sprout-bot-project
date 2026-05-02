/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy:       '#0d2d46',
        teal:       '#03695e',
        periwinkle: '#3f5ba4',
        cream:      '#fff8d3',
        mint:       '#e6fbda',
      },
      fontFamily: {
        sans: ['"Alan Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
