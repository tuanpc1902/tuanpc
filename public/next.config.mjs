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
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tuanpc.site",
        port: "",
        pathname: "/image/upload/**",
      },
    ],
  }

};

export default nextConfig;
