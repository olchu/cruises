/* eslint-disable import/no-anonymous-default-export */
import type { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const svgUrl = 'https://booking.infoflot.com/public/schemas/svg/Лунная_соната_13-07-2024.svg'; // Замените на URL вашего SVG файла

  try {
    const svgResponse = await fetch(svgUrl);
    const svgData = await svgResponse.text();

    // Установите заголовок Content-Type для SVG
    res.setHeader('Content-Type', 'image/svg+xml');
    res.send(svgData);
  } catch (error) {
    res.status(500).send('Ошибка при получении SVG');
  }
};
