/** @type {import('tailwindcss').Config} */
export default {
  daisyui: {
    themes: ["light"],
  },
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // primary: "#A32615",
        // secondary: "#F25864",
        primary: "#D4562B",
        secondary: "#F5A856",
      },
    },
  },
  plugins: [require("daisyui")],
};
