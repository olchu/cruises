import {
  DBExcursionType,
  DBInfoRouteType,
  DBRouteType,
} from '@/shared/types/dbCruisesType';
import { CruiseDetailsResponce } from './getCruiseDetails';

const endPoint = 'https://api-crs.vodohod.com/json/v3/cruise/route';

export const getCruiseRoute = async (
  cruiseRes: CruiseDetailsResponce,
  token: any
) => {
  const { result: cruise } = cruiseRes;
  const url = `${endPoint}?id=${cruise?.id}`;
  try {
    const res = await fetch(url, {
      method: 'Get',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    let route: DBRouteType = {};
    const { data }: CruiseRoutesResponce = await res.json();

    for (let key in data) {
      const day = data[key];
      let excursions: DBExcursionType[] = [];

      if (Array.isArray(day.excursions)) {
        for (let excursion in day.excursions) {
          const elem = day.excursions[excursion][0];
          excursions.push({
            name: elem.name,
            duration: elem.duration,
            annotation: elem.annotation,
            description: elem.description,
            groupSize: elem.groupSize,
          });
        }
      }

      if (typeof day.excursions === 'object') {
        for (const [key, value] of Object.entries(day.excursions)) {
          const elem = value[0];
          excursions.push({
            name: elem.name,
            duration: elem.duration,
            annotation: elem.annotation,
            description: elem.description,
            groupSize: elem.groupSize,
          });
        }
      }

      const rowDay = cruise.route.find((item) => item.id === day.id);

      const program: DBInfoRouteType = {
        city: rowDay?.name || day.city,
        dateIn: day.dateIn * 1000 - 3 * 60 * 60 * 1000,
        dateOut: day.dateOut * 1000 - 3 * 60 * 60 * 1000,
        annotation: day.annotation,
        excursions: [...excursions],
        extraExcursions: [],
      };

      if (route[day.day]) {
        route[day.day].push(program);
      } else {
        route[day.day] = [program];
      }
    }
    return route;
  } catch (error) {
    console.error('Не получилось загрузить маршрут к ' + cruise.id + ' круизу');
  }
};

export interface CruiseRoutesResponce {
  result: string;
  data: Datum[];
}

export interface Datum {
  id: number;
  dateIn: number;
  dateInStr: string;
  dateOut: number;
  dateOutStr: string;
  port: number;
  city: number;
  latitude: string;
  longitude: string;
  annotation: string;
  isGreen: number;
  canBoard: number;
  canDisembark: number;
  updatedAt: number;
  sort: number;
  day: number;
  landPoint: number;
  landPointData: any[];
  excursions: any[] | { [key: string]: Excursion[] };
  extraExcursions: any[];
}

export interface Excursion {
  id: number;
  name: string;
  annotation: string;
  groupSize: string;
  duration: number;
  features: { [key: string]: string };
  company_owner_id: number;
  agency_fee_type: number;
  agency_fee_size: number;
  minAge: null;
  maxAge: null;
  description: string;
  variant: number;
}
