/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './ui/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: "class",
  
  theme: {
    extend: {
      colors: {
        primary: '#fff',
        secundary: '#000;',
        black: '#000',
        hoverPrimary: "rgb(87 87 87)",

      },
      backgroundColor: {
        primary: '#fff',
        secundary: '#000;',
        black: '#000',
        hoverPrimary: "#e1e1e1",
        light:"#598fff",
        dark:"#18191A",
        darkComponet:"#242526"
    },
      boxShadow: {
        container: "-1px 1px 5px 0px #ddd",
        dark:"-1px 1px 5px 0px #010101"
      },
      animation:{
        rotate: "rotate 1s infinite cubic-bezier(0.4, 0, 1, 1)",
        animationSkeleton: "skeleton 2s cubic-bezier(0.4, 0, 0.6, 1) infinite"
        
      },
      keyframes: {
        rotate: " from {  transform: rotate(0deg)} to {transform: rotate(359deg)}",
        skeleton: {
          '0%,100%': { opacity: '1' },
          '50%': { opacity: '.5' },
        }
      },
      transitionProperty: {
        dark: "background-color,color,fill",
     
      },
      fill: {
        unired:"#598fff"
      },
      borderColor: {
        dark: "#575757",
        secundary:"#fff"
      }
    },
  },
  plugins: [],
}