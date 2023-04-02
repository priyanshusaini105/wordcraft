/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4A7C59",
        secondary: "#F2A154",
        accent: "#DADDE0",
        text: "#2D2D2D",
        error: "#FF0000",
        success: "#008000",
      },
      fontFamily: {
        nunito: ["var(--font-nunito)"],
        poppins: ["var(--font-poppins)"],
      },
    },
  },
  plugins: [],
};
