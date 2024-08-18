// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'prisma/client';
import { Prisma } from '@prisma/client';
import fs from 'fs-extra';
import axios from 'axios';
import path from 'path';
import sharp from 'sharp';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    let response: { id: number; status: string }[] = [];

    console.log('!!!!!!!!!! SYNC !!!!!!!!!!!!');
    const { cruises, loadFrom } = req.body;
    console.log('loadFrom', loadFrom);

    for (let cruise of cruises) {
      console.log('cruise = ', cruise.extId);
      const selectCruise = await prisma.cruises.findFirst({
        where: {
          loadFrom: loadFrom,
          extId: cruise.extId,
        },
      });

      console.log('selectCruise', selectCruise);
      const cruiseImgUrl = cruise.image;

      let imgPath = '';
      console.log('cruiseImgUrl', cruiseImgUrl);

      if (cruiseImgUrl) {
        const imgNameSplit = cruiseImgUrl.split('/');
        const imgName = imgNameSplit.at(-1);
        imgPath = path.join('uploads', 'cruises', imgName);

        const fileExists = await fs.pathExists(imgPath);

        if (!fileExists) {
          const response = await axios.get(cruiseImgUrl, {
            responseType: 'arraybuffer',
          });

          const optimizedImageBuffer = await sharp(response.data)
            .jpeg({ quality: 80 })
            .toBuffer();

          await fs.outputFile(imgPath, optimizedImageBuffer);
        }
      }

      if (selectCruise?.id) {
        console.log('update');
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
            image: imgPath ? `/${imgPath}` : imgPath,
            shipImg: cruise.shipImg,
            type: cruise.type,
            class: cruise.class,
            provider: cruise.provider,
            offers: cruise.offers,
            discounts: cruise.discounts,
          },
        });
        response.push({ id: cruise.extId, status: 'ok' });
      } else {
        console.log('insert');
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
            image: imgPath ? `/${imgPath}` : imgPath,
            shipImg: cruise.shipImg,
            type: cruise.type,
            class: cruise.class,
            provider: cruise.provider,
            offers: cruise.offers,
            discounts: cruise.discounts,
          },
        });
        response.push({ id: cruise.extId, status: 'ok' });
      }
    }
    return res.status(200).json(response);
  } catch (error) {
    console.log('error',error)
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
