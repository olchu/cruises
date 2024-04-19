// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getCompilation } from '@/shared/lib/utils/getCompilation';
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

    const { cruises, totalCount } = await getCompilation({
      query: queries,
      itemsOnPage: parseInt(query?.limit as string),
      skip: parseInt(query?.skip as string) || undefined,
    });

    return res.status(200).json({ cruises, totalCount });
  } catch (error) {
    return res.status(500).json(error);
  }
}
