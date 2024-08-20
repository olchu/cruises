import { DBCruiseData } from '@/shared/types/dbCruisesType';
import { getCruisesById } from './getCruisesById';
import { format } from 'date-fns';
import { ShipsType } from '@/shared/types/prismaResponse';

const infoflotKey = process.env.NEXT_PUBLIC_INFOFLOT_KEY;

function timeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const getCruisesByShip = async (
  extId: number,
  id: number,
  ship: ShipsType
  // ): Promise<DBCruiseData[]> => {
) => {
  const prepareCruises: DBCruiseData[] = [];
  const dateStart = format(new Date(), 'yyyy-MM-dd');

  const cruisesRes = await fetch(
    `https://restapi.infoflot.com/cruises?key=${infoflotKey}&limit=500&ship=${extId}&dateStartFrom=${dateStart}`
  );
  const cruises: InfoflotCruisesResponce = await cruisesRes.json();

  for (let i in cruises.data) {
    if (cruises.data[i]?.id) {
      await timeout(2000);
      const details = await getCruisesById(cruises.data[i].id, id, ship);
      if (details) {
        prepareCruises.push(details);
      }
    } else {
      console.log('i', i, cruises.data[i]);
    }
  }

  // return prepareCruises;

  return {
    preparedData: prepareCruises,
    count: cruises.data?.length,
    success: prepareCruises.length,
  };
};

export interface InfoflotCruisesResponce {
  filters: Filters;
  pagination: Pagination;
  data: Datum[];
  excursions: null;
}

export interface Datum {
  id: number;
  name: string;
  beautifulName: BeautifulName | null;
  dateStart: Date;
  dateEnd: Date;
  dateStartTimestamp: number;
  dateEndTimestamp: number;
  days: number;
  nights: number;
  route: string;
  routeShort: string;
  description: null;
  routeBottomText: null;
  include: string;
  additional: null;
  important: null;
  discountsText: string;
  min_price: number | null;
  max_price: number | null;
  min_price_absolute: number;
  max_price_absolute: number;
  minDefaultPrice: number | null;
  shipType: number;
  currency: number;
  childAge: ChildAge;
  infantAge: InfantAge;
  noPlaceChildAge: null;
  rate: number;
  freeCabins: number | null;
  portStart: number;
  portEnd: number;
  dockStart: null;
  weekend: null;
  cruise_flags: null;
  cruise_time_avaliable: number;
  cruise_premium_text: null;
  notesExcursions: null;
  startCity: number;
  startCityName: StartCityName;
  startCityNameEn: StartCityNameEn;
  startCityCountry: number;
  isStepByStepCabinSearch: null;
  timetableDoc: string;
  timetablePdf: string;
  map: string;
  tags: any[];
  prices: Prices;
  min_price_rur: number | null;
  rate_euro: number;
  min_price_euro: number | null;
  suggestion: null;
  without_visa: null;
  russian_squad: null;
  russian_squad_title: any[];
  sug: Sug[];
  ship: Ship;
  discounts: Discount[];
  maxDiscount: number;
  type: TypeElement;
  rivers: TypeElement[];
  regions: TypeElement[];
  popularRoutes: TypeElement[];
  photo: null;
  oneWay: boolean;
  oneMoreDayStop: boolean;
}

enum BeautifulName {
  ПутешествиеВСевернуюСтолицу = 'Путешествие в Северную столицу',
  ПутешествиеВСтолицуТатарстана = 'Путешествие в столицу Татарстана',
}

enum ChildAge {
  The514 = '5,14',
}

interface Discount {
  type: TypeElement;
  values: Value[];
}

interface TypeElement {
  id: number;
  name: TypeName;
}

enum TypeName {
  ВалаамИлиКижи = 'Валаам или Кижи',
  Волга = 'Волга',
  ВолгоБалтийскийВодныйПуть = 'Волго-Балтийский водный путь',
  Вытегра = 'Вытегра',
  ЗолотоеКольцоРоссии = 'Золотое кольцо России',
  КаналИмениМосквы = 'Канал имени Москвы',
  Карелия = 'Карелия',
  КруизыВИзМосквы = 'Круизы в/из Москвы',
  КруизыВИзСанктПетербурга = 'Круизы в/из Санкт-Петербурга',
  КруизыВКазань = 'Круизы в Казань',
  КруизыЗаБаллыКЛК = 'Круизы за баллы КЛК',
  ЛадожскоеОзеро = 'Ладожское озеро',
  МайскиеПраздники = 'Майские праздники ',
  МеждуМосквойИСанктПетербургом = 'Между Москвой и Санкт-Петербургом',
  Нева = 'Нева',
  ОнежскоеОзеро = 'Онежское озеро',
  РебёнокБесплатно = 'Ребёнок бесплатно',
  РекиРоссии = 'Реки России',
  Россия = 'Россия',
  Свирь = 'Свирь',
  СкидкаЗаРазмещение = 'Скидка за размещение',
  СкидкаИмениннику = 'Скидка имениннику',
  СкидкаНаСвободныеМеста = 'Скидка на свободные места',
  СкидкаПенсионеру = 'Скидка пенсионеру',
  СкидкаРебёнку = 'Скидка ребёнку',
  Татарстан = 'Татарстан',
  Шексна = 'Шексна',
}

interface Value {
  id: number;
  timeStart: Date;
  timeEnd: Date;
  amount: number;
  gender: number;
  title: ValueTitle;
  description: null;
}

enum ValueTitle {
  ДетиБесплатно = 'Дети бесплатно',
  ДоплатаЗаОдноместноеРазмещениеВА2 = 'Доплата за одноместное размещение в «А2»',
  ДополнительноеМестоВА2 = 'Дополнительное место в «А2+»',
  ДополнительноеМестоВА2НИА4Н = 'Дополнительное место в «А2н» и «А4н»',
  ДополнительноеМестоВПолулюксЛюксИПанорамныйЛюкс = 'Дополнительное место в «Полулюкс», «Люкс» и «Панорамный люкс»',
  СкидкаДетям = 'Скидка детям',
  СкидкаИмениннику = 'Скидка имениннику',
  СкидкаПенсионерам = 'Скидка пенсионерам',
}

enum InfantAge {
  The05 = '0,5',
}

interface Prices {
  min: number | null;
  infoflotBonus: number | null;
  old: number | null;
  bsoz: null;
}

interface Ship {
  id: number;
  name: ShipName;
  type: number;
  operatorId: number;
  operatorName: OperatorName;
  operatorBrandName: null;
  moscow_time: number;
  decks: Deck[];
  cabins: null;
  photo: Photo;
}

interface Deck {
  id: number;
  name: DeckName;
  position: number;
}

enum DeckName {
  ГлавнаяПалуба = 'Главная палуба',
  НижняяПалуба = 'Нижняя палуба',
  СредняяПалуба = 'Средняя палуба',
  ШлюпочнаяПалуба = 'Шлюпочная палуба',
}

enum ShipName {
  ДвеСтолицы = 'Две столицы',
}

enum OperatorName {
  ОООДвеСтолицы = 'ООО "Две столицы"',
}

interface Photo {
  name: PhotoName;
  path: string;
  type: TypeEnum;
  size: string;
}

enum PhotoName {
  The0E548C08E94648E68C618Cfd89Ae1F25Jpg = '0e548c08-e946-48e6-8c61-8cfd89ae1f25.jpg',
}

enum TypeEnum {
  ImageJPEG = 'image/jpeg',
}

enum StartCityName {
  Казань = 'Казань',
  Москва = 'Москва',
  СанктПетербург = 'Санкт-Петербург',
}

enum StartCityNameEn {
  Kazan = 'Kazan',
  Moscow = 'Moscow',
  SaintPetersburg = 'Saint Petersburg',
}

interface Sug {
  id: number;
  type: number;
  title: SugTitle;
  descr: string;
  icon: string;
  priority: number;
}

enum SugTitle {
  ДетиБесплатно = 'Дети бесплатно',
  ДополнительныеУсловияРазмещения = 'Дополнительные условия размещения',
  КруизыВРассрочку = 'Круизы в рассрочку',
  Примечания = 'Примечания',
  СезоннаяСкидка = 'Сезонная скидка',
  СкидкаГруппам = 'Скидка группам',
  СкидкаДетямДо14Лет = 'Скидка детям до 14 лет',
  СкидкаИмениннику = 'Скидка имениннику',
  СкидкаПенсионерам = 'Скидка пенсионерам',
}

interface Filters {
  key: string;
  limit: number;
  ship: string;
  dateStartFrom: Date;
}

interface Pagination {
  pages: Pages;
  records: Records;
}

interface Pages {
  total: number;
  current: Current;
  next: null;
  previous: null;
}

interface Current {
  number: number;
  url: string;
}

interface Records {
  total: number;
  perPage: number;
  onCurrentPage: number;
}
