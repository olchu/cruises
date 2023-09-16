import { useState } from 'react';
import { DBCruiseData } from '../ui/cruises/utils/prepareCruises';
import { prepareTarifs } from '../ui/cruises/utils/prepareTarifs';

const endPoint = 'https://api-crs.vodohod.com/json/v3/cruise/room-tariffs';

export const useGetTarifs = () => {
  const getTarif = async (id: number, token: any) => {
    const url = `${endPoint}?id=${id}`;
    try {
      const res = await fetch(url, {
        method: 'Get',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data: Main = await res.json();
      return data.result.decks;
    } catch (error) {}
  };

  const getTarifs = async (cruises: DBCruiseData[], token: any) => {
    let tarifs = {};
    for (const item of cruises) {
      const tarifsres = (await getTarif(item.exId, token)) as Deck[]; // TODO переделать на promise.all
      console.log('cruise', item);
      console.log('tarifsres', prepareTarifs(tarifsres));
    }
    return tarifs;
  };
  return { getTarifs };
};

interface Main {
  code: number;
  message: string;
  result: Result;
}

interface Result {
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

interface RoomClass {
  id: number;
  name: string;
  annotation: string;
  description: string;
  accommodationTypes: AccommodationType[];
  tariffs: Tariff[];
  thumbnails: string[];
  extra: number;
  color: string;
  meta_id: number;
  meta_name: string;
  availability: number;
  bedConfigs: any[];
}

interface AccommodationType {
  id: number;
  name: AccommodationTypeName;
}

enum AccommodationTypeName {
  The1МестноеРазмещение = '1-местное размещение',
  The2МестноеРазмещение = '2-местное размещение',
  The3МестноеРазмещение = '3-местное размещение',
}

interface Tariff {
  id: number;
  accommodations: Accommodation[];
  meta_id: number;
  meta_name: string;
}

interface Accommodation {
  id: number;
  name: MetaNameEnum;
  price: Price;
}

enum MetaNameEnum {
  ТарифЛайтВзрослый3РазовоеПитание = 'Тариф Лайт Взрослый (3-разовое питание)',
  ТарифЛайтВзрослыйЗавтрак = 'Тариф Лайт Взрослый (завтрак)',
  ТарифЛайтВзрослыйЗавтракУжин = 'Тариф Лайт Взрослый (завтрак+ ужин)',
  ТарифЛайтДетский3РазовоеПитание = 'Тариф Лайт Детский (3-разовое питание)',
  ТарифЛайтДетскийЗавтрак = 'Тариф Лайт Детский (завтрак)',
  ТарифЛайтДетскийЗавтракУжин = 'Тариф Лайт Детский (завтрак+ ужин)',
}

interface Price {
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

interface MetaTariff {
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
  ndsId: null;
}

interface DocumentTypesID {
  id: number;
  name: DocumentTypesIDName;
  sort: null;
  created_at: null;
  updated_at: null;
  status: number;
}

enum DocumentTypesIDName {
  ИностранныйДокумент = 'Иностранный документ',
  ПаспортРФ = 'Паспорт РФ',
  СвидетельствоОРожденииРФ = 'Свидетельство о рождении РФ',
}
