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
      }
    > = {};
    for (const key in query) {
      const optionKey = [
        'cityStart',
        'cityEnd',
        'type',
        'class',
        'provider',
      ].includes(key)
        ? 'contains'
        : 'in';
      objQuery[key] = {
        [optionKey]: query[key],
      };
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
