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
};

export default nextConfig;
