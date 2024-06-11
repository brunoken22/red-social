/** @type {import('next').NextConfig} */
const withSvgr = require("next-svgr");
 
const nextConfig = withSvgr({
  reactStrictMode: true,
  async rewrites() {
    return [ 
      {
        source: '/:path*',
        destination: 'https://red-social-node.omega.com/:path*', 
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
