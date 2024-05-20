// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { defaultItemsOnPage } from '@/shared/constants/constants';
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'prisma/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { query } = req;
    const shipId = query?.ship as string;
    const cruiseId = query?.id as string;
    const where = {
      dateStart: query?.dateStart
        ? {
            gte: new Date(query.dateStart as string),
          }
        : undefined,
      dateEnd: query?.dateEnd
        ? {
            lte: new Date(query.dateEnd as string),
          }
        : undefined,
      cityStart: query?.cityFrom
        ? { contains: query?.cityFrom as string }
        : undefined,
      cityEnd: query?.cityEnd
        ? { contains: query?.cityEnd as string }
        : undefined,
      shipId: shipId
        ? {
            in: shipId?.split(',').map(Number) || [],
          }
        : undefined,
      days: parseInt(query?.days as string) || undefined,
    };

    const cruiseSelect = await prisma.cruises.findMany({
      where: where,
      orderBy: {
        dateStart: 'asc',
      },
      take: parseInt(query?.limit as string) || defaultItemsOnPage,
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
