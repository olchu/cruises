import { DBInfoRouteType, DBRouteType } from '@/shared/types/dbCruisesType';
import { intervalToDuration, isSameDay } from 'date-fns';
import { Excursion, Timetable } from './getCruisesById';

// "city": "Нижний Новгород",
// "dateIn": 1719792000,
// "dateOut": 1719835200,
// "annotation": "<p>Отправление в рейс. Посадка за 2 часа до отправления. Время\r\nмосковское.\r\n</p><p>Вас встретят у трапа теплохода, помогут с багажом и зарегистрируют на рейс.\r\n</p><p>После регистрации вам выдадут ключ от вашей <a style=\"color: blue;\" href=\"https://vodohod.com/for-travellers/before/ship-facilities/\">каюты</a>, приглашение в <a style=\"color: blue;\" href=\"https://vodohod.com/for-travellers/onboard/dining/\">ресторан</a> (номер закреплённого за вами столика), <a style=\"color: blue;\" href=\"https://vodohod.com/for-travellers/onboard/payment-for-services-on-the-ship/\">расчётную карту</a> компании «ВодоходЪ», бланк <a style=\"color: blue;\" href=\"https://vodohod.com/for-travellers/onboard/excursion-program/\">заказа экскурсий</a> (для заполнения в первый день круиза).\r\n</p><p>Первая услуга по питанию – обед. Каждый день на борту теплохода вас будет ждать <a style=\"color: blue;\" href=\"https://vodohod.com/for-travellers/onboard/entertainment/\">развлекательная программа</a>.\r\n</p>",
// "excursions": [],
// "extraExcursions": []

// "name": "Пешеходная экскурсия в Макарьевский монастырь",
// "duration": 60,
// "groupSize": "Группа до 25 человек",
// "annotation": "У стен монастыря встречались суда, плывущие вниз по течению, с теми, которые тянули бурлаки из устья Волги. Именно здесь, на середине Волжского пути, зародилась крупнейшая в России Макарьевская ярмарка ",
// "description": "<p>Мо

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
  const start = obj.timeStart.split(':');
  const end = obj.timeEnd.split(':');
  const hoursDuration = Number(end[0]) - Number(start[0]);
  const minutesDuration = Number(end[1]) - Number(start[1]);

  return hoursDuration * 60 + minutesDuration;
};
