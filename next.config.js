/** @type {import('next').NextConfig} */
const withSvgr = require("next-svgr");
 
const nextConfig = withSvgr({
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
