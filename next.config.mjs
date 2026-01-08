/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable font optimization for better performance
  optimizeFonts: true,
  // distDir: "_next", // Removed: Vercel requires default .next directory
  
  // Compiler optimizations
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  
  // ESLint configuration
  eslint: {
    // Ignore ESLint during builds for Cloudflare Pages compatibility
    ignoreDuringBuilds: true,
  },
  
  // Generate build ID
  generateBuildId: async () => {
    if (process.env.BUILD_ID) {
      return process.env.BUILD_ID;
    }
    return `${new Date().getTime()}`;
  },
  
  // Image optimization
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
  },
  
  // Performance optimizations
  experimental: {
    optimizePackageImports: ['antd', '@heroicons/react'],
  },
  
  // Webpack optimizations - Disable cache completely to prevent heavy cache directory
  webpack: (config, { isServer }) => {
    // Disable cache for both client and server builds to prevent cache directory creation
    // This prevents webpack from creating cache/webpack/ directories that can be very large
    config.cache = false;
    
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        moduleIds: 'deterministic',
      };
    }
    
    return config;
  },
};

export default nextConfig;

