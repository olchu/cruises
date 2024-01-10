// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'prisma/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { query } = req;
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
      cityStart: query?.cityFrom as string,
      cityEnd: query?.cityEnd as string,
      shipId: parseInt(query?.ship as string) || undefined,
    };

    const cruiseSelect = await prisma.cruises.findMany({
      where: where,
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
