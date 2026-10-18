module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        walmart: {
          blue: '#0071DC',
          navy: '#041E42',
          yellow: '#FFC220',
          bg: '#F2F8FD'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
}
