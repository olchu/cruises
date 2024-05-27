import { Providers } from '@/shared/constants/providers';
import { DBCruiseData } from '@/shared/types/dbCruisesType';
import { ShipsType } from '@/shared/types/prismaResponse';
import { intervalToDuration } from 'date-fns';
import { prepareTarifs } from './prepareTarifs';

export const getCruisesByShip = async (ship: ShipsType) => {
  let routes: any[] = [];
  try {
    const routesRes = await fetch(
      '/api/admin/getGamaNavigation?shipId=' + ship.extId
    );
    const routeList = await routesRes.json();

    const shipsRes = await fetch(
      '/api/admin/getGamaShips?shipId=' + ship.extId
    );
    const shipList = await shipsRes.json();
    const routesGamma = routeList.elements[1].elements;

    console.log('shipList', shipList);

    let count = 0;

    for (const i in routesGamma) {
      const item = routesGamma[i];
      // if (count < 1) {
      const data = item.attributes;
      const dateS = new Date(data.s);
      const dateF = new Date(data.f);
      const { days } = intervalToDuration({
        start: dateS,
        end: dateF,
      });
      const cities = data.name.split(' - ');

      const { tarifs, minPrice } = await prepareTarifs(data.id, shipList);

      routes.push({
        extId: Number(data.id),
        title: '',
        dateStart: dateS,
        dateEnd: dateF,
        cityStart: cities[0],
        cityEnd: cities.at(-1),
        days: days ? days + 2 : 0,
        shortRoute: data.name.replaceAll(' - ', ' → '),
        shipId: ship.id,
        extShipId: ship.extId,
        shipName: ship.name,
        loadFrom: Providers.gama,
        description: '',
        included: '',
        excluded: '',
        restaurants: '',
        image: '',
        shipImg: ship.img,
        minPrice: minPrice,
        minDiscountPrice: minPrice,
        citiesInRoute: cities,
        route: {},
        prices: tarifs,
        class: ship.class,
        type: ship.type,
        provider: ship.provider,
        offers: [],
        discounts: [],
      });
    }
    count++;
    // }

    console.log('routes', routes);
  } catch (e) {
    console.log('e', e);
  }

  return routes;
};
