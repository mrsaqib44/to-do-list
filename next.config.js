/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig
module.exports = {
    swcMinify: false, // Disable SWC minification
    experimental: { forceSwcTransforms: false } // Force JS fallback
  };
  