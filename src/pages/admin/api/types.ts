export type Providers = 'vodohod' | 'infoflot';

export type CruiseListResponseData = {
  id: number;
  dateStart: string;
  dateEnd: string;
  duration: number;
  cityStart: {
    name: string;
  };
  cityEnd: {
    name: string;
  };
  route: { name: string }[];
  name: string;
  motorship: {
    name: string;
    id: number;
  };
};

export interface CruiseList {
  exId: number;
  loadFrom: Providers;
  dateStart: string;
  dateEnd: string;
  cityStart: string;
  cityEnd: string;
  days: number;
  title: string;
  shortRoute: string;
  route: string;
  shipId: number;
  shipName: string;
}

export interface Main {
  code: number;
  message: string;
  result: Result;
}

export interface Result {
  metaTariffs: MetaTariff[];
  decks: Deck[];
}

export interface Deck {
  id: number;
  name: string;
  scheme: string;
  roomClasses: RoomClass[];
  meta_id: number;
  meta_name: string;
}

export interface RoomClass {
  id: number;
  name: string;
  annotation: null | string;
  description: null | string;
  accommodationTypes: AccommodationType[];
  tariffs: Tariff[];
  thumbnails: string[];
  extra: number;
  color: string;
  meta_id: number;
  meta_name: string;
  availability: number;
  bedConfigs: BedConfig[];
}

export interface AccommodationType {
  id: number;
  name: AccommodationTypeName;
}

export enum AccommodationTypeName {
  The1МестноеРазмещение = '1-местное размещение',
  The2МестноеРазмещение = '2-местное размещение',
}

export interface BedConfig {
  id: string;
  name: BedConfigName;
}

export enum BedConfigName {
  ДвеОдноспальныеКровати = 'Две односпальные кровати',
  ОднаДвуспальнаяКровать = 'Одна двуспальная кровать',
  ПоУмолчанию = 'По умолчанию',
}

export interface Tariff {
  id: number;
  accommodations: Accommodation[];
  meta_id: number;
  meta_name: MetaNameEnum;
}

export interface Accommodation {
  id: number;
  name: MetaNameEnum;
  price: Price;
}

export enum MetaNameEnum {
  ИностранныйТуристЗаКруиз = 'Иностранный турист (за круиз)',
  ТарифВзрослый = 'Тариф Взрослый',
  ТарифДетский = 'Тариф Детский',
}

export interface Price {
  id: number;
  value: number;
  currency: number;
  nds: number;
  created_at: number;
  updated_at: number;
  status: number;
  tariff: number;
  user_edited: null;
  discountedValue: number;
  metaTariff: number;
}

export interface MetaTariff {
  id: number;
  name: MetaNameEnum;
  sort: number;
  annotation: string;
  updatedAt: number;
  ageFrom: number;
  ageTo: number;
  isBeyondAge: boolean;
  documentTypesIds: DocumentTypesID[];
  managerVerification: number;
  type: number;
  _status: number;
  ndsId: number | null;
}

export interface DocumentTypesID {
  id: number;
  name: string;
  sort: null;
  created_at: null;
  updated_at: null;
  status: number;
}
