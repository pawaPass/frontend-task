/** @type {import('tailwindcss').Config['theme']} */
module.exports = {
  fontFamily: {
    sans: ['var(--font-outfit)', 'Arial', 'sans-serif']
  },
  extend: {
    fontSize: {
      '2xs': ['0.625rem', { lineHeight: '0.75rem' }]
    },
    colors: {
      'pp-green': {
        50: '#F4E5FB',
        100: '#E2BEF6',
        200: '#CF93F1',
        300: '#BA66EC',
        400: '#AB41E7',
        500: '#9B14E1',
        600: '#8916DB',
        700: '#6F16D4',
        800: '#5615CE',
        900: '#0014C6',
        DEFAULT: '#8916DB'
      },
      'gradient-left': '#E63125',
      'gradient-right': '#F0C047',
      'gradient-mid': '#E97836',
      // 'blue-gray': '#3e3c5c',
      'gray-mid': '#b1b1b1',

      // pawaMoney
      'pm-purple': {
        50: '#F4E5FB',
        100: '#E2BEF6',
        200: '#CF93F1',
        300: '#BA66EC',
        400: '#AB41E7',
        500: '#9B14E1',
        600: '#8916DB',
        700: '#6F16D4',
        800: '#5615CE',
        900: '#0014C6',
        DEFAULT: '#8916DB'
      },
      'light-blue': '#E6EEF2',
      'off-black': '#333333',
      'blue-gray': '#86979E',
      gold: '#FFBF00',
      'off-white': '#F5FAFA',
      error: '#E63125',
      valid: '#3CB40A'
    },
    keyframes: {
      'slide-in-and-out': {
        '0%': { opacity: 0, transform: 'translateY(-40px)' },
        '5%, 25%': { opacity: 1, transform: 'translateY(0)' },
        '30%, 100%': { opacity: 0, transform: 'translateY(40px)' }
      },
      'fade-in': {
        '0%': { opacity: 0 },
        '100%': { opacity: 1 }
      }
    },
    animation: {
      'slide-in-and-out': 'slide-in-and-out 20s ease-in-out infinite',
      'fade-in': 'fade-in 0.5s ease-in-out'
    },
    transitionProperty: {
      'max-width-and-bottom': 'max-width, bottom'
    }
  }
};
