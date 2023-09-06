/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{scss,css}'
  ],
  theme: {
    extend: {
      colors: {
        product: {
          default: '#085A79',
          hover: '#074D69',
          active: '#06425A',
          lychee: '#D7000F',
        },
        status: {
          success: '#0B8749',
          successLight: '#DAFCEB',
          info: '#015CC8',
          warning: '#EAB600',
          warningLight: '#FFF3C8',
          danger: '#CB0000',
        },
        text: {
          default: '#002E40',
          caption: '#66828C',
          onFill: '#FFFFFF',
          danger: '#AF0000',
          link: '#116699',
        },
        border: {
          default: '#CCD5D9',
          dark: '#99ABB3',
          divider: '#E6EAEC',
          onFill: '#FFFFFF',
          danger: '#AF0000',
          warning: '#755C00',
        },
        background: {
          primary: '#FFFFFF',
          secondary: '#F0F2F3',
          tertiary: '#DDE9EE',
        },
        icon: {
          default: '#66828C',
          dark: '#002E40',
          onFill: '#FFFFFF',
        },
        primitive: {
          gray: {
            200: '#CCD5D9',
          },
        }
      },
    },
  },
  plugins: [],
}

