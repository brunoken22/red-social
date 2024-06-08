/** @type {import('next').NextConfig} */
const withSvgr = require("next-svgr");
 
const nextConfig = withSvgr({
  reactStrictMode: true,
  // crossOrigin: 'anonymous',
  async rewrites() {
    return [ 
      {
        source: '/:path*',
        destination: 'https://red-social-node.onrender.com/:path*', 
      },
      {
        source: '/:path*',
        destination: 'http://localhost:3000/:path*', 
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
