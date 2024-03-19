const fs = require('fs');
const prisma = require('./prisma-client'); // Подключите ваш клиент Prisma

(async () => {
  const ships = await prisma.ships.findMany(); // Получаем список теплоходов из базы данных

  // Сохраняем список теплоходов в файле ships.json в папке public
  fs.writeFileSync('./public/ships.json', JSON.stringify(ships));
})();
