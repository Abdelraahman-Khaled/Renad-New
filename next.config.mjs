/** @type {import('next').NextConfig} */
const nextConfig = {
  // Emit a minimal, self-contained server build for Docker (.next/standalone)
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        // Blog photos served by the Rails backend (Active Storage proxy URLs)
        protocol: "https",
        hostname: "backend.renadintl.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
