import daisyui from "daisyui";
import daisyuiThemes from "daisyui/src/theming/themes";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui],

  daisyui: {
    themes: [
      {
        black: {
          ...daisyuiThemes["black"],
          primary: "rgb(29,155,240)",
          // primary: "#374151",

          secondary: "rgb(24,24,24)",
        },
      },
    ],
  },
};
