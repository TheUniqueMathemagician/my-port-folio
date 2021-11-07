/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com"]
  },
  webpack5: true,
  headers: [
    {
      key: 'X-DNS-Prefetch-Control',
      value: 'on'
    },
    {
      key: 'X-XSS-Protection',
      value: '1; mode=block'
    },
    {
      key: 'Content-Security-Policy',
      value: 'default-src \'self\''
    },
    {
      key: 'X-Content-Type-Options',
      value: 'nosniff'
    },
    {
      key: 'X-Frame-Options',
      value: 'sameorigin'
    }
  ]
};