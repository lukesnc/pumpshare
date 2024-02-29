/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"], 
  mode: "jit", // Just in Time Compiler
  theme: {
  extend: {
  colors: { // Add custom color palette
  primary: "#2B2B2A",
  secondary: "#A2A2A2",
  tertiary: "#F4F4F4",
  accent: 'tealGreen',
  dimGray: '#A2A2A2',
  tealGreen: '#2E8185',
  emeraldMist: `#4BBD8E`
  },
  fontFamily: {
  poppins: ["Poppins", "sans-serif"],
  merriweather: ["Merriweather", "serif"],
  lato: ["Lato", "sans-serif"]
  },
  },
  screens: {
  xs: "480px",
  ss: "620px",
  sm: "768px",
  md: "1060px",
  lg: "1200px",
  xl: "1700px",
  },
  },
  plugins: [],
  };