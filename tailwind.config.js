/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        plusJakarta: ['Plus Jakarta Sans', 'sans-serif'],
        clash: ['Clash Display', 'sans-serif'],
      },
      animation: {
        'in': 'fadeIn 0.3s ease-in-out',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'glow-ring': 'glowRing 2.5s ease-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glowPulse: {
          '0%': { opacity: '1', boxShadow: '0 0 12px rgba(59, 130, 246, 0.8)' },
          '50%': { opacity: '0.4', boxShadow: '0 0 20px rgba(59, 130, 246, 0.4)' },
          '100%': { opacity: '1', boxShadow: '0 0 12px rgba(59, 130, 246, 0.8)' },
        },
        glowRing: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(1.8)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};
