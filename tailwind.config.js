/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        'blue-ribbon': {
          '50': '#ecf3ff',
          '100': '#dde8ff',
          '200': '#c2d4ff',
          '300': '#9cb6ff',
          '400': '#758dff',
          '500': '#4255ff',
          '600': '#363af5',
          '700': '#2a2bd8',
          '800': '#2528ae',
          '900': '#262b89',
          '950': '#161750',
      },
        'cloud-burst': {
          '50': '#f3f6fb',
          '100': '#e3eaf6',
          '200': '#cedbef',
          '300': '#acc3e4',
          '400': '#85a5d5',
          '500': '#6888c9',
          '600': '#546fbc',
          '700': '#4a5eab',
          '800': '#414e8c',
          '900': '#384370',
          '950': '#282e4a',
      },
      'perano': {
        '50': '#edf1ff',
        '100': '#dfe4ff',
        '200': '#c5cdff',
        '300': '#a8b1ff',
        '400': '#7d80fc',
        '500': '#655ef6',
        '600': '#5641ea',
        '700': '#4a33cf',
        '800': '#3c2ca7',
        '900': '#342b84',
        '950': '#21194d',
    },
    'mustard': {
      '50': '#fffbeb',
      '100': '#fff5c6',
      '200': '#ffe888',
      '300': '#ffdc62',
      '400': '#ffc420',
      '500': '#f9a207',
      '600': '#dd7902',
      '700': '#b75506',
      '800': '#94410c',
      '900': '#7a360d',
      '950': '#461b02',
  },
    'mauve': {
      '50': '#fcf4ff',
      '100': '#f9e7ff',
      '200': '#f3ceff',
      '300': '#eeaaff',
      '400': '#e474fe',
      '500': '#d540f5',
      '600': '#bb20d9',
      '700': '#9e17b4',
      '800': '#831593',
      '900': '#6e1778',
      '950': '#480151',
  },

    
      
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
]
}