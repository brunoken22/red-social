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
      },
      backgroundColor: {
        primary: '#fff',
        secundary: '#000;',
        black: '#000',
        hoverPrimary: "#e1e1e1",
        dark:"#18191A",
        darkComponet:"#242526"
      },
      boxShadow: {
        container:"-1px 1px 5px 0px #000"
      },
      animation:{
        rotate: "rotate 1s infinite cubic-bezier(0.4, 0, 1, 1)",
        animationSkeleton:"animationSkeleton 1s linear infinite;"
      },
      keyframes: {
        rotate: " from {  transform: rotate(0deg)} to {transform: rotate(359deg)}",
        animationSkeleton:" 100%{background-color: #ffffff;right: 0%;-webkit-filter: blur(1px);box-shadow: 0 0 50px 10px, 0 0 50px 10px;0%{-webkit-filter: blur(1px);right: 100%;}"
      },
      transitionProperty: {
        dark: "background-color,color,fill",
     
      },
      borderColor: {
        dark: "#575757",
        secundary:"#fff"
      }
    },
  },
  plugins: [],
}