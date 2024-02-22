/** @type {import('next').NextConfig} */
const nextConfig = {
  optimizeFonts: false,
  distDir: "_next",
  generateBuildId: async () => {
    if (process.env.BUILD_ID) {
      return process.env.BUILD_ID;
    } else {
      return `${new Date().getTime()}`;
    }
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tuanpc.site',
        port: '3000',
        pathname: '/images/**'
      },
      {
        protocol: 'http',
        hostname: 'tuanpc.site',
        port: '3000',
        pathname: '/images/**'
      }
    ]
  }
};

export default nextConfig;
