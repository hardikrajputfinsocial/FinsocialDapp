/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  /**
   * Remove CaseSensitivePathsPlugin to avoid duplicate-casing module warnings on Windows
   */
  webpack: (config) => {
    config.plugins = config.plugins.filter(
      (plugin) => plugin.constructor.name !== 'CaseSensitivePathsPlugin'
    );
    return config;
  },
}

export default nextConfig
