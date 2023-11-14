// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'prisma/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await prisma.cruises.deleteMany({
      where: {
        dateStart: {
          lt: new Date(Date.now()),
        },
      },
    });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
}
