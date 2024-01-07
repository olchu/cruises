import Prisma from '@prisma/client';
import prisma from 'prisma/client';
import { CruiseType, ShipsType } from '../types/prismaResponse';

export const getCities = async (groupBy: keyof Prisma.cruises) => {
  const citiesSelect = await prisma.cruises.groupBy({
    by: [groupBy],
  });

  const cities: CruiseType[] = JSON.parse(JSON.stringify(citiesSelect));

  return cities;
};
