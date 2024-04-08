// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'prisma/client';

export type CompilationQueryType = Record<string, any[] | string>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { query, body } = req;
    const queries = body;

    const options = queries.map((query: CompilationQueryType) => {
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
          case ['offers', 'citiesInRoute', 'discounts', 'rivers'].includes(
            key
          ): {
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
