/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  safelist: [
    'bg-background',
    'text-primary',
    'font-dm-sans',
    'text-2xl',
    'font-roc-grotesk',
    'text-lg',
    'bg-pill-bg',
    'text-secondary',
    'text-primary'
  ],
  theme: {
    extend: {
      fontFamily: {
        'dm-sans': ['DM Sans', 'sans-serif'],
        'roc-grotesk': ['Roc Grotesk', 'sans-serif'],
        'dm-mono': ['DM Mono', 'monospace'],
      },
      colors: {
        'primary': '#000000',  // Based on text color in design
        'secondary': '#A2A2A2', // Secondary text color
        'accent': '#0404D6',   // Blue button color
        'light-gray': '#F3F3FF',
        'selected-blue': '#0202D5', // Selected text color
        'background': '#FAFAFA',
        'pill-bg': '#FFFFFF',
        'border': '#D9D9D9',  // Updated to match Figma's #D9D9D9
        'tag-text': '#494949',
        'curation-text': '#A2A2A2',
        'nav-icon': '#7F7F7F',
      },
      borderRadius: {
        'custom': '16px 16px 0px 0px',
        'pill': '4px',
        'card': '12px',
      }
    },
  },
  plugins: [],
};
