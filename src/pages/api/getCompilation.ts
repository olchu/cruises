// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'prisma/client';

type Query = Record<string, any[] | string>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { query, body } = req;
    const queries = body;

    const options = queries.map((query: Query) => {
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
      take: parseInt(query?.limit as string) || undefined,
      skip: parseInt(query?.skip as string) || undefined,
    });
    const cruises = await JSON.parse(JSON.stringify(cruiseSelect));

    const totalCountres = await prisma.cruises.count({
      where: where,
    });
    const totalCount = await JSON.parse(JSON.stringify(totalCountres));

    return res.status(200).json({ cruises, totalCount });
  } catch (error) {
    return res.status(500).json(error);
  }
}
