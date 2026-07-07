/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        void: '#04040B',
        void2: '#0a0a16',
        indigo2: '#5B6CFF',
        cyan2: '#16E0FF',
        magenta2: '#FF2BD6',
        gold2: '#FFE08A',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        mono: ['"Space Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
}
