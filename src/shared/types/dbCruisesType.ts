export interface DBCruiseData {
  extId: number;
  title: string;
  dateStart: Date;
  dateEnd: Date;
  cityStart: string;
  cityEnd: string;
  days: number;
  route: DBRouteType;
  shortRoute: string;
  shipId: number;
  extShipId: number;
  shipName: string;
  loadFrom: string;
  minPrice: number;
  minDiscountPrice: number;
  citiesInRoute: string[];
  description: string;
  restaurants: string;
  included: string;
  excluded: string;
  image: string;
  prices: DBTarif;
}

export type DBPrice = {
  dicountedVal: null | number;
  val: null | number;
  annotation: string;
  description: string;
  thumbnails: string[];
};

export type DBTarif = Record<string, Class>;
type Class = Record<string, DBPrice>;

export type DBExcursionType = {
  duration: number;
  name: string;
  annotation: string;
  description: string;
  groupSize: string;
};

export type DBInfoRouteType = {
  city: number | string;
  dateIn: number;
  dateOut: number;
  annotation: string;
  excursions: DBExcursionType[];
  extraExcursions: DBExcursionType[];
};

export type DBRouteType = Record<string, DBInfoRouteType[]>;
