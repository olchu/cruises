export interface InfoflotPricesResponse {
  prices: { [key: string]: Price };
  cabins: { [key: string]: Cabin };
  freePlacesCount: number;
  cruise: Cruise[];
}

interface Cabin {
  name: string;
  type_id: number;
  deck: string;
  deck_id: string;
  separate: number;
  gender: number;
  status: number;
  places: Place[];
}

enum Deck {
  ГлавнаяПалуба = 'Главная палуба',
  НижняяПалуба = 'Нижняя палуба',
  СредняяПалуба = 'Средняя палуба',
  ШлюпочнаяПалуба = 'Шлюпочная палуба',
}

interface Place {
  name: number;
  type: number;
  position: number;
  status: number;
}

interface Cruise {
  id: number;
  name: string;
  beautifulName: string;
  dateStart: Date;
  dateEnd: Date;
  dateStartTimestamp: number;
  dateEndTimestamp: number;
  days: number;
  nights: number;
  route: string;
  routeShort: string;
  shipId: number;
  description: string;
  routeBottomText: string;
  include: string;
  additional: string;
  important: string;
  discountsText: string;
  min_price: number;
  max_price: number;
  min_price_absolute: number;
  max_price_absolute: number;
  minDefaultPrice: number;
  min_fprice: number;
  shipType: number;
  currency: number;
  childAge: string;
  infantAge: string;
  noPlaceChildAge: null;
  rate: number;
  freeCabins: number;
  showMap: number;
  portStart: number;
  portEnd: number;
  dockStart: null;
  weekend: number;
  wow: number;
  cruise_flags: number;
  cruise_time_avaliable: number;
  cruise_premium_text: string;
  notesExcursions: string;
  startCity: number;
  startCityName: string;
  startCityNameEn: string;
  startCityCountry: number;
  isStepByStepCabinSearch: null;
  min_price_rur: number;
  min_cabins_price: number;
  max_cabins_price: number;
}

interface Price {
  type_name: string;
  type_description: string;
  prices: Prices;
  services: Service[];
  infoflot_bonus: number;
}

interface Prices {
  default: number;
  main_bottom: AdditionalBottom;
  main_top: AdditionalBottom;
  additional_bottom: AdditionalBottom;
  additional_top: AdditionalBottom;
  pocket: Pocket;
  cost: Cost;
  single: number;
  sanina: Sanina;
}

interface AdditionalBottom {
  adult: number;
  mixed: number;
  child: number;
}

interface Cost {
  adult: boolean;
  child: boolean;
}

interface Pocket {
  cruise: boolean;
  avia: boolean;
  other: boolean;
}

interface Sanina {
  rub: boolean;
  eur: boolean;
  usd: boolean;
}

interface Service {
  service_id: string;
  name: string;
  icon: string;
  description: Description;
  priority: string;
}

enum Description {
  Empty = '',
  Стол = 'Стол',
}
