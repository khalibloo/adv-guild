module.exports = {
  purge: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  important: true,
  theme: {
    extend: {
      colors: {
        primary: "#8E42D3",
        ["primary-tint"]: "#9B5AD8",
        secondary: "#D26973",
        tertiary: "#BB5B97",
        darkerPurple: "#291720",
        darkPurple: "#38182F",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
