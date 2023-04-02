/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'downloader.la',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig
