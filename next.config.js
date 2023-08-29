/** @type {import('next').NextConfig} */
const withSvgr = require("next-svgr");
 
const nextConfig = withSvgr({

  images: {
    domains: ['res.cloudinary.com'], // Agrega los dominios permitidos aquí
  },
  api: {
    bodyParser: {
      sizeLimit: '35mb',
    },
  },
    compiler: {
      styledComponents: true
    },
  });
module.exports = nextConfig
