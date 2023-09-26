import { Tarif } from '../ui/cruises/utils/prepareTarifs';

interface RouteType {
  id: number;
  name: string;
  in: Date;
  out: Date;
  annotation: string;
}

export interface DBCruiseData {
  extId: number;
  title: string;
  dateStart: Date;
  dateEnd: Date;
  cityStart: string;
  cityEnd: string;
  days: number;
  route: RouteType[];
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
  prices: Tarif;
}
