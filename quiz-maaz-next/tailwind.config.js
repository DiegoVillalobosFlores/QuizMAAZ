module.exports = {
  mode: 'jit',
  purge: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      boxShadow: {
        DEFAULT: '0 1px 3px 0 #ff0094, 0 1px 2px 0 #ff0094',
      },
      colors: {
        textColor: 'black',
        background: {
          primary: '#C2C2C2',
          secondary: '#666666',
        },
        accent: '#ff0094',
        incorrect: '#ed6a5a',
        correct: '#c4ffb2',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
