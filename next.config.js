module.exports = {
  reactStrictMode: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['new.vbp.ru'], // Добавляем домен, чтобы использовать для изображений
  },
  async rewrites() {
    return [
      {
        source: '/uploads/:path*', // Путь для изображений
        destination: '/api/uploads/:path*', // Путь, куда должен быть перенаправлен запрос
      },
      {
        source: '/api/auth/signin', // Путь для изображений
        destination: '/api/auth/signin', // Путь, куда должен быть перенаправлен запрос
      },
    ];
  },
};