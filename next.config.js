/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['storage-crs.vodohod.com'], // Добавьте хостинг изображений в список разрешенных хостов
  },
}

module.exports = nextConfig
