// next.config.mjs or next.config.js
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '159.65.222.66',
        port: '3000',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;
