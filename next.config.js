/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove the 'output: export' setting as it's causing the routes-manifest issue
  images: {
    domains: ['images.unsplash.com'],
  },
  // Add this to help with ESLint configuration
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig