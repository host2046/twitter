/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "upload.wikimedia.org",
      "avatars.githubusercontent.com",
      "images.unsplash.com",
    ],
  },
};

module.exports = nextConfig;
