/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Disables ESLint compilation checks during production builds.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Disables strict TypeScript compiler checks during production builds.
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
