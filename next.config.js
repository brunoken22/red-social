/** @type {import('next').NextConfig} */
const withSvgr = require("next-svgr");
 
const nextConfig = withSvgr({
  experimental: {
    serverActions: {
      allowedOrigins: ['my-proxy.com', '*.my-proxy.com'],
    },
  },
  images: {
    domains: ['res.cloudinary.com'], // Agrega los dominios permitidos aquí
  },

});

module.exports = nextConfig
