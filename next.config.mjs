/** @type {import('next').NextConfig} */
const nextConfig = {
  /* React Compiler disabled — causes 404 on client components with GSAP */
  // reactCompiler: true,

  images: {
    remotePatterns: [
      {
        // Hashnode CDN — cover images
        protocol: "https",
        hostname: "cdn.hashnode.com",
      },
      {
        // Hashnode media uploads
        protocol: "https",
        hostname: "**.hashnode.com",
      },
    ],
  },
};

export default nextConfig;
