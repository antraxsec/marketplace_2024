/** @type {import('tailwindcss').Config} */

import { nextui } from "@nextui-org/react";


module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite-react/lib/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        // Definir colores personalizados para el modo oscuro
        dark: {
          20: "#FFD666",//text amarillo
          30: "#453F2D",//botn amarillo
          50: "#bef264",//boton primario
          100: "#21443C",//boton seundario verde
          200: "#75E889",//boton text verde
          300: "#0f3460",
          400: "#67737F",
          500: '#343B44',
          600: "#212B36",
          700: '#2F363F',
          800: "#161C24"
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui(),
    require("flowbite/plugin")
  ],

}
