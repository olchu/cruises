import { DBInfoRouteType, DBRouteType } from '@/shared/types/dbCruisesType';
import { isSameDay } from 'date-fns';
import { Excursion, Timetable } from './getCruisesById';

export const getRoutes = (table: Timetable[]) => {
  const routes: DBRouteType = {};
  let dayNumber = 0;

  for (const i in table) {
    const route: DBInfoRouteType = {
      city: table[i].city.name,
      dateIn: new Date(table[i].dateArrival).getTime(),
      dateOut: new Date(table[i].dateDeparture).getTime(),
      annotation: table[i].description,
      extraExcursions: [],
      excursions:
        table[i].excursions?.map((item) => {
          return {
            name: item.name,
            groupSize: '',
            annotation: item.type,
            description: item.description,
            duration: getDuration(item),
          };
        }) || [],
    };

    if (
      isSameDay(routes[dayNumber]?.[0]?.dateIn, new Date(table[i].dateArrival))
    ) {
      routes[dayNumber].push(route);
    } else {
      dayNumber += 1;
      routes[dayNumber] = [route];
    }
  }

  return routes;
};

const getDuration = (obj: Excursion) => {
  const start = obj.timeStart?.split(':');
  const end = obj.timeEnd?.split(':');
  const hoursDuration = start && end ? Number(end[0]) - Number(start[0]) : 0;
  const minutesDuration = start && end ? Number(end[1]) - Number(start[1]) : 0;

  return hoursDuration * 60 + minutesDuration;
};
