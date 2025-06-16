const withPWA = require('next-pwa')({
  dest: 'public',
  disable: false, // เปิด PWA ใน development เพื่อทดสอบ
  register: true,
  skipWaiting: true,
  runtimeCaching: [
    {
      urlPattern: /^https?.*/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'offlineCache',
        expiration: {
          maxEntries: 200,
        },
      },
    },
  ],
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.pexels.com'],
  },
}

module.exports = withPWA(nextConfig)