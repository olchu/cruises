import Prisma from '@prisma/client';
import prisma from 'prisma/client';
import { CruiseType } from '../types/prismaResponse';

const citiesArr = ['Нижний Новгород'];

export const getCities = async (groupBy: keyof Prisma.cruises) => {
  const citiesSelect = await prisma.cruises.groupBy({
    by: [groupBy],
  });

  const cities: CruiseType[] = JSON.parse(JSON.stringify(citiesSelect));

  const filtered = new Set<string>();

  cities.forEach((item) => {
    const city = item[groupBy] as string;
    // console.log(groupBy, citiesArr.includes(city), city);
    if (citiesArr.includes(city)) filtered.add(city);
    else {
      const firstName = city.split(' ');
      // console.log('city', groupBy, city, firstName[0]);
      if (firstName[0] === 'Нижний') filtered.add('Нижний Новгород');
      else filtered.add(firstName[0]);
    }
  });

  return Array.from(filtered);
};
