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
  const sortedShip = ships.sort((a, b) => {
    if (a.name.toLowerCase() < b.name.toLowerCase()) {
      return -1;
    }
    if (a.name.toLowerCase() > b.name.toLowerCase()) {
      return 1;
    }
    return 0;
  });

  return sortedShip;
};
