import prisma from 'prisma/client';
import { ShipsType } from '../types/prismaResponse';

export const getShips = async () => {
  const shipsSelect = await prisma.ships.findMany({
    select: {
      id: true,
      name: true,
    },
    where: {
      active: 1,
    },
  });

  const ships: ShipsType[] = JSON.parse(JSON.stringify(shipsSelect));

  return ships;
};
