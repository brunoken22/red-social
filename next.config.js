/** @type {import('next').NextConfig} */
const withSvgr = require("next-svgr");
 
const nextConfig = withSvgr({
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: 'https://red-social-node.onrender.com/:path*', // Proxy para la API durante el desarrollo
      },
    ];
  },
  images: {
    domains: ['res.cloudinary.com'], // Agrega los dominios permitidos aquí
  },

});

module.exports = nextConfig
