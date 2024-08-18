module.exports = {
  reactStrictMode: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['cruise.ap-travel.ru'], // Добавляем домен, чтобы использовать для изображений
  },
  async rewrites() {
    return [
      {
        source: '/api/auth/signin', // Путь для изображений
        destination: '/api/auth/signin', // Путь, куда должен быть перенаправлен запрос
      },
    ];
  },
};
