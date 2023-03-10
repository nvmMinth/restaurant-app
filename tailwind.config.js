/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      colors: {
        headingColor: "#2e2e2e",
        textColor: "#515151",
        cartNumBg: "#e80013",
        primary: "#f5f3f3",
        cardOverlay: "rgba(256, 256, 256, 0.4)",
        cardOverlay2: "rgba(256, 256, 256, 0.8)"
      },
      backgroundImage: {
        'heroPattern': "url('./img/heroBg.png')",
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}
