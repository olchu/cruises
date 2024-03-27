// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'prisma/client';
import fs from 'fs-extra';
import axios from 'axios';
import path from 'path';
import sharp from 'sharp';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    let response: { id: number; status: string }[] = [];
    const ships = req.body?.ships;
    const provider = req.body?.provider;

    for (const i in ships) {
      const ship = ships[i];
      const shipImgUrl = ship.img;
      let imgPath = '';

      if (shipImgUrl) {
        console.log('!!!!!!    img    !!!!!!!!');
        const imgName = `ship_${provider}_${ship.extId}.jpg`; // Генерируем уникальное имя файла
        imgPath = path.join('uploads', 'ships', imgName); // Путь, куда сохранить файл

        const fileExists = await fs.pathExists(imgPath);

        if (!fileExists) {
          console.log('file not');
          // Загружаем изображение по URL
          const response = await axios.get(shipImgUrl, {
            responseType: 'arraybuffer',
          });

          // Оптимизируем изображение с помощью sharp
          const optimizedImageBuffer = await sharp(response.data)
            .jpeg({ quality: 70 }) // Устанавливаем качество JPEG
            .toBuffer();

          // Сохраняем оптимизированное изображение на сервере
          await fs.outputFile(imgPath, optimizedImageBuffer);
        }
      }

      const selectShip = await prisma.ships.findFirst({
        where: {
          loadFrom: provider,
          extId: ship.extId,
        },
      });

      if (selectShip?.id) {
        await prisma.ships.update({
          where: {
            id: selectShip?.id,
          },
          data: { ...ship, img: `/${imgPath}` },
        });
      } else {
        const createRes = await prisma.ships.create({
          data: { ...ship, img: `/${imgPath}` },
        });
        console.log('createRes', createRes);
      }

      response.push({ id: ship.extId, status: 'ok' });
    }
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
}
