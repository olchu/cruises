import prisma from 'prisma/client';
import { ShipsTypeSelect, GroupedShips } from '../types/shipList';

export const getShipsList = async () => {
  const allShips: ShipsTypeSelect[] = await prisma.ships.findMany({
    select: {
      id: true,
      name: true,
      type: true,
      class: true,
    },
    where: {
      active: 1,
    },
  });

  const groupedShips: GroupedShips = {};

  allShips.forEach((ship) => {
    if (ship.type === null || ship.class === null) return;
    if (!groupedShips[ship.type]) {
      groupedShips[ship.type] = {};
    }
    if (!groupedShips[ship.type][ship.class]) {
      groupedShips[ship.type][ship.class] = [];
    }

    groupedShips[ship.type][ship.class].push(ship);
  });

  return groupedShips;
};
