/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "new.vbp.ru",
        port: "",
        pathname: "/uploads/**",
      },
    ],
  },
  // images: {
  //  // domains: ['storage-crs.vodohod.com'], // Добавьте хостинг изображений в список разрешенных хостов
  // },
}

module.exports = nextConfig
