/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Remove any 'output: "export"' setting if it exists
  // This is likely causing the routes-manifest.json issue
}

module.exports = nextConfig