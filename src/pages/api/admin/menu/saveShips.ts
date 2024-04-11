import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const jsonData = req.body;

      // Путь, куда сохранять JSON
      const filePath = path.join(process.cwd(), 'public', 'ships.json');

      // Сохраняем JSON в файл
      fs.writeFileSync(filePath, JSON.stringify(jsonData));

      // Возвращаем успешный статус
      res.status(200).json({ message: 'JSON успешно сохранен' });
    } catch (error) {
      // Возвращаем ошибку, если что-то пошло не так
      res
        .status(500)
        .json({ error: 'Что-то пошло не так при сохранении JSON' });
    }
  } else {
    // Возвращаем ошибку, если метод запроса не POST
    res.status(405).json({ error: 'Метод не разрешен' });
  }
}
