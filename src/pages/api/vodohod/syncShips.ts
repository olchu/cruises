// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Providers } from '@/shared/constants/providers';
import { DBShipsData } from '@/features/admin/vodohod/ui/ships/utils/prepareShips';
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'prisma/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    let response: { id: number; status: string }[] = [];
    req.body?.ships.forEach(async (ship: DBShipsData) => {
      const selectShip = await prisma.ships.findFirst({
        where: {
          loadFrom: Providers.vodohod,
          extId: ship.extId,
        },
      });
     
      if (selectShip?.id) {
        await prisma.ships.update({
          where: {
            id: selectShip?.id,
          },
          data: ship,
        });
      } else {
        await prisma.ships.create({
          data: ship,
        });
      }

      response.push({ id: ship.extId, status: 'ok' });
    });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
}
