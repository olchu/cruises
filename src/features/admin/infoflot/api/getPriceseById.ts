import { priceLevel } from '@/shared/constants/priceLevel';
import { InfoflotPricesResponse } from '@/shared/types/infoflot/infoflotPrice';
import { ShipsType } from '@/shared/types/prismaResponse';

const infoflotKey = process.env.NEXT_PUBLIC_INFOFLOT_KEY;

export const getPriceseById = async (extId: number, ship: ShipsType) => {
  const priceRes = await fetch(
    `https://restapi.infoflot.com/cruises/${extId}/cabins?key=${infoflotKey}`
  );
  const data: InfoflotPricesResponse = await priceRes.json();

  const cabinsKeys = Object.keys(data.cabins);
  const deks: Record<string, {}> = {};
  const cabinsPhoto = JSON.parse(ship.cabinsPhoto as string) || {};
  let minPrice = 10000000000000;
  let minPriceDiscount = 10000000000000;
  // console.log('cabinsPhoto', cabinsPhoto);

  const level = priceLevel[ship.extId] || 100;

  for (const key in cabinsKeys) {
    const i = cabinsKeys[key];
    const cabin = data.cabins[i];
    const dekName = cabin?.deck.replaceAll(' палуба', '');

    // console.log('PHOTO     ', cabinsPhoto[dekName]?.[cabin.type_id])
    const dicountedVal =
      data.prices[cabin.type_id].prices.main_bottom.adult * level;
    const val =
      data.prices[cabin.type_id].prices.default === 0
        ? dicountedVal
        : data.prices[cabin.type_id].prices.default * level;

    minPrice = minPrice >= val ? val : minPrice;
    minPriceDiscount =
      minPriceDiscount >= dicountedVal ? dicountedVal : minPriceDiscount;
    const cabinInfo = {
      val: val,
      annotation: '',
      description: data.prices[cabin.type_id].type_description,
      dicountedVal: dicountedVal,
      thumbnails: [...(cabinsPhoto[cabin?.deck]?.[cabin.type_id] || [])], //TODO разобрааться почему undefiend
    };

    if (deks[dekName]) {
      deks[dekName] = {
        ...deks[dekName],
        [data.prices[cabin.type_id].type_name]: cabinInfo,
      };
    } else {
      deks[dekName] = {
        [data.prices[cabin.type_id].type_name]: cabinInfo,
      };
    }
  }

  // console.log('deks', deks);
  // console.log('minPrice', minPrice);
  // console.log('minPriceDiscount', minPriceDiscount);

  return { prices: deks, minPrice, minPriceDiscount };
};
