import { defaultItemsOnPage } from '@/shared/constants/constants';
import prisma from 'prisma/client';

export type CompilationQueryType = Record<string, any[] | string>;

type GetCompilationType = {
  itemsOnPage: number;
  query: CompilationQueryType[];
  skip?: number;
};

export const getCompilation = async ({
  itemsOnPage,
  query,
  skip = 0,
}: GetCompilationType) => {
  const options = query.map((query: CompilationQueryType) => {
    const objQuery: Record<
      string,
      {
        in?: any[];
        contains?: string;
        array_contains?: string;
        gte?: Date;
        lte?: Date;
      }
    > = {};
    for (const key in query) {
      switch (true) {
        case ['offers', 'citiesInRoute', 'discounts', 'rivers'].includes(key): {
          const val = query[key] as string;
          objQuery[key] = {
            array_contains: val,
          };
          break;
        }

        case ['cityStart', 'cityEnd', 'type', 'class', 'provider'].includes(
          key
        ): {
          const val = query[key] as string;
          objQuery[key] = {
            contains: val,
          };
          break;
        }

        case key === 'dateStart': {
          const val = query[key] as string;
          objQuery[key] = {
            gte: new Date(val),
          };
          break;
        }

        case key === 'dateEnd': {
          const val = query[key] as string;
          const endDate = new Date(new Date(val).getTime() + 86400000);
          endDate.setUTCHours(0, 0, 0, 0); // Устанавливаем время на полночь UTC
          objQuery[key] = {
            lte: endDate,
          };
          break;
        }

        default:
          const val = query[key] as any[];
          objQuery[key] = {
            in: val,
          };
          break;
      }
    }
    return objQuery;
  });

  const where = {
    OR: options,
  };

  const cruiseSelect = await prisma.cruises.findMany({
    where: where,
    orderBy: {
      dateStart: 'asc',
    },
    take: itemsOnPage || defaultItemsOnPage,
    skip: skip,
  });
  const cruises = await JSON.parse(JSON.stringify(cruiseSelect));

  const totalCountres = await prisma.cruises.count({
    where: where,
  });
  const totalCount = await JSON.parse(JSON.stringify(totalCountres));

  return { cruises, totalCount, where };
};
