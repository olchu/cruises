// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Providers } from '@/shared/constants/providers';
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'prisma/client';

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
      // req.body?.ships.forEach(async (ship: ShipsType) => {
      console.log('             ');
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
          data: { ...ship },
        });
      } else {
        console.log('****** new *******');
        console.log('name', ship);

        const createRes = await prisma.ships.create({
          data: ship,
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
