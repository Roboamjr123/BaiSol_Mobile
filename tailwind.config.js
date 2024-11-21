/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#F5F5F5", 
        secondary: {
          DEFAULT: "#FF9C01", 
          100: "#FF9001",
          200: "#FF8E01",
          300: "#FF7F00", 
        },
        black: {
          DEFAULT: "#333333",
          100: "#4A4A4A",
          200: "#666666",
        },
        gray: {
          100: "#F0F0F0",  
          200: "#E5E7EB",  
          300: "#D1D5DB", 
        },
        white: "#FFFFFF",  
      },
      fontFamily: {
        pthin: ["Poppins-Thin", "sans-serif"],
        pextralight: ["Poppins-ExtraLight", "sans-serif"],
        plight: ["Poppins-Light", "sans-serif"],
        pregular: ["Poppins-Regular", "sans-serif"],
        pmedium: ["Poppins-Medium", "sans-serif"],
        psemibold: ["Poppins-SemiBold", "sans-serif"],
        pbold: ["Poppins-Bold", "sans-serif"],
        pextrabold: ["Poppins-ExtraBold", "sans-serif"],
        pblack: ["Poppins-Black", "sans-serif"],
      },
    },
  },
  plugins: [],
};
