import { Deck } from '@/features/admin/vodohod/api/getTarif';
import { DBPrice, DBTarif } from '@/shared/types/dbCruisesType';

const numbers = 100;

export const prepareTarifs = async (routeId: string, deckList: any) => {
  let tarifs: DBTarif = {};

  const priceRes = await fetch('/api/admin/getGamaPrice?routeId=' + routeId);
  const pricesJson = await priceRes.json();
  console.log('priceRes', pricesJson);
  const minPriceArr: number[] = [];

  for (const i in pricesJson) {
    const cost = pricesJson[i]?.elements.reduce(
      (minCost: number, item: any) => {
        const itemCost = item?.attributes.std_3;
        return itemCost < minCost ? itemCost : minCost;
      },
      pricesJson[i]?.elements[0]?.attributes?.std_3
    );
    minPriceArr.push(cost);
    const { id, name } = pricesJson[i]?.attributes;

    const { deckName, deckId, cabin_description_id, cabinId } =
      deckList.newdeck[name];
    const {
      name: cabinType,
      description,
      images,
    } = deckList.description[cabin_description_id];

    const lastPrice = tarifs?.[deckName]?.[cabinType]?.val;

    tarifs = {
      ...tarifs,
      [deckName]: {
        ...tarifs?.[deckName],
        [cabinType]: {
          annotation: '',
          thumbnails: images || [],
          description: description,
          val:
            lastPrice !== null && lastPrice < cost
              ? lastPrice * numbers
              : cost * numbers,
          dicountedVal:
            lastPrice !== null && lastPrice < cost
              ? lastPrice * numbers
              : cost * numbers,
        },
      },
    };
  }

  console.log('tarif', tarifs);
  return { tarifs, minPrice: Math.min(...minPriceArr) * numbers };
};
