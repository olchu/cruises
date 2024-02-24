import { InfoflotPricesResponse } from '@/shared/types/infoflot/infoflotPrice';
import { useLayoutEffect, useState } from 'react';
import { FreeCabinsType } from './useGetPrice';

const infoflotKey = process.env.NEXT_PUBLIC_INFOFLOT_KEY;

export const getPricesInfoflot = async (id: number | undefined) => {
  const resp = await fetch(
    `https://restapi.infoflot.com/cruises/${id}/cabins?key=${infoflotKey}`
  );
  const { cabins, prices }: InfoflotPricesResponse = await resp.json();

  const obj: FreeCabinsType = {};
  let freeCabins: string[] = [];
  for (const key in cabins) {
    if (cabins[key].status === 0) {
      const { type_id, deck, name } = cabins[key];
      const roomNumber = name;
      const deckName = deck.replace(' палуба','');
      const typeName = prices[type_id].type_name;
      freeCabins.push(roomNumber);

      // if (obj[typeName]) {
      //   obj[typeName].push(roomNuber);
      // } else {
      //   obj[typeName] = [roomNuber];
      // }

      if (obj[deckName]) {
        if (obj[deckName][typeName]) {
          obj[deckName][typeName].push(roomNumber);
        } else obj[deckName][typeName] = [roomNumber];
      } else {
        obj[deckName] = { [typeName]: [roomNumber] };
      }
    }
  }
  return { cabins: obj, freeCabins };
};
