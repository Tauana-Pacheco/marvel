/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    extend: {
      colors: {
        primary: "#A7C5BD",
        secondary: "#E5DDCB",
        accent: "#EB7B59",
        error: "#CF4647",
        dark: "#524656",
      },
    },
  },
  plugins: [],
}
