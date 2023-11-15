// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { DBCruiseData } from '@/features/admin/vodohod/api/getCruiseInfo';
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'prisma/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
  ) {
    try {
      let response: { id: number; status: string }[] = [];
      req.body?.cruises.forEach(async (cruise: DBCruiseData) => {
        const result = await prisma.cruises.upsert({
          where: {
          // @ts-ignore
          extId: cruise.extId,
        },
        // @ts-ignore
        update: cruise,
        // @ts-ignore
        create: cruise,
      });
      // console.log('result', result);
      response.push({ id: cruise.extId, status: 'ok' });
    });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
}

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   try {
//     const result = await prisma.cruises.createMany({
//       data: req.body.cruises,
//       skipDuplicates: true,
//     });

//     return res.status(200).json(result);
//   } catch (error) {
//     return res.status(500).json(error);
//   }
// }
