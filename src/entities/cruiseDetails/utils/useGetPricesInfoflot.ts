import { InfoflotPricesResponse } from '@/shared/types/infoflot/infoflotPrice';
import { useLayoutEffect, useState } from 'react';
import { FreeCabinsType } from '../type/cruisePrices';

const infoflotKey = process.env.NEXT_PUBLIC_INFOFLOT_KEY;



export const useGetPricesInfoflot = (id: number | undefined) => {
  const [data, setData] = useState<FreeCabinsType | null>(null);
  const [freeCabins, setFreeCabins] = useState<string[] | null>(null);

  const fetchPrice = async (id: number) => {
    const resp = await fetch(
      `https://restapi.infoflot.com/cruises/${id}/cabins?key=${infoflotKey}`
    );
    const { cabins, prices }: InfoflotPricesResponse = await resp.json();

    const obj: FreeCabinsType = {};
    let freeCabins: string[] = [];
    for (const key in cabins) {
      if (cabins[key].status === 0) {
        const roomNuber=cabins[key].name
        freeCabins.push(roomNuber);
        const { type_id } = cabins[key];
        const typeName = prices[type_id].type_name;
        if (obj[typeName]) {
          obj[typeName].push(roomNuber);
        } else {
          obj[typeName] = [roomNuber];
        }
      }
    }

    setFreeCabins(freeCabins);
    setData(obj);
  };

  useLayoutEffect(() => {
    if (id) {
      fetchPrice(id);
    }
  }, [id]);

  return { cabins: data, freeCabins };
};
