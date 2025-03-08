const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
    flowbite.content(),
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        blue: {
          500: "#3366FF",
        },
        neutral: {
          300: "#D1D5DB",
          600: "#4B5563",
          700: "#374151",
          800: "#1F2937",
        },
        slate: {
          100: "#F1F5F9",
        },
        stone: {
          500: "#78716C",
        },
        zinc: {
          800: "#27272A",
        },
      },
      boxShadow: {
        custom: "6px 6px 54px rgba(0,0,0,0.05)",
      },
    },
  },
  plugins: [
    flowbite.plugin(),
    require('flowbite/plugin')
  ],
};