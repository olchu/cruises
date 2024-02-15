// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Providers } from '@/shared/constants/providers';
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'prisma/client';
import { Prisma } from '@prisma/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    let response: { id: number; status: string }[] = [];

    const { cruises, loadFrom } = req.body;
    console.log('loadFrom', loadFrom);

    for (let cruise of cruises) {
      const selectCruise = await prisma.cruises.findFirst({
        where: {
          loadFrom: loadFrom,
          extId: cruise.extId,
        },
      });

      if (selectCruise?.id) {
        console.log('update', selectCruise?.id);
        await prisma.cruises.update({
          where: {
            id: selectCruise.id,
          },
          data: {
            extId: cruise.extId,
            title: cruise.title,
            dateStart: cruise.dateStart,
            dateEnd: cruise.dateEnd,
            cityStart: cruise.cityStart,
            cityEnd: cruise.cityEnd,
            days: cruise.days,
            route: cruise.route as unknown as Prisma.JsonArray,
            citiesInRoute: cruise.citiesInRoute,
            shortRoute: cruise.shortRoute,
            extShipId: cruise.extShipId,
            shipId: cruise.shipId,
            shipName: cruise.shipName,
            loadFrom: cruise.loadFrom,
            minPrice: cruise.minPrice,
            minDiscountPrice: cruise.minDiscountPrice,
            prices: cruise.prices,
            description: cruise.description,
            restaurants: cruise.restaurants,
            included: cruise.included,
            excluded: cruise.excluded,
            image: cruise.image,
          },
        });
        response.push({ id: cruise.extId, status: 'ok' });
      } else {
        console.log('!!!!!!! insert   !!!!!');
        const res = await prisma.cruises.create({
          data: {
            extId: cruise.extId,
            title: cruise.title,
            dateStart: cruise.dateStart,
            dateEnd: cruise.dateEnd,
            cityStart: cruise.cityStart,
            cityEnd: cruise.cityEnd,
            days: cruise.days,
            route: cruise.route as unknown as Prisma.JsonArray,
            citiesInRoute: cruise.citiesInRoute,
            shortRoute: cruise.shortRoute,
            extShipId: cruise.extShipId,
            shipId: cruise.shipId,
            shipName: cruise.shipName,
            loadFrom: cruise.loadFrom,
            minPrice: cruise.minPrice,
            minDiscountPrice: cruise.minDiscountPrice,
            prices: cruise.prices,
            description: cruise.description,
            restaurants: cruise.restaurants,
            included: cruise.included,
            excluded: cruise.excluded,
            image: cruise.image,
          },
        });
        console.log('????? res ?????');
        response.push({ id: cruise.extId, status: 'ok' });
      }
    }
    return res.status(200).json(response);
  } catch (error) {
    console.log('******* error  ********', error);
    return res.status(500).json(error);
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '150mb', // Set desired value here
    },
  },
};
