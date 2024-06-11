/** @type {import('next').NextConfig} */
const withSvgr = require("next-svgr");
 
const nextConfig = withSvgr({
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/about', // Aplica los encabezados a /about
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
        ],
      },
      {
        source: '/api/(.*)', // Aplica los encabezados a todas las rutas en /api/
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [ 
      {
        source: '/:path*',
        destination: 'https://red-social-node.onrender.com/:path*', 
      },
    ];
  },
  experimental: {
    middleware: true,
  },
  images: {
    domains: ['res.cloudinary.com'], 
  },

});

module.exports = nextConfig
