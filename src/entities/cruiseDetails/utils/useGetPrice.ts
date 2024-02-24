import { Providers } from '@/shared/constants/providers';
import { useEffect, useState } from 'react';
import { getPricesInfoflot } from './getPricesInfoflot';
import { getPricesVodohod } from './getPricesVodohod';

type GetFreeCabinsProps = {
  id?: number;
  provider: Providers;
};

type CabinsType = Record<string, string[]>;

export type FreeCabinsType = Record<string, CabinsType>;

export const useGetFreeCabins = ({ id, provider }: GetFreeCabinsProps) => {
  const [cabins, setCabins] = useState<FreeCabinsType | null>(null);
  const [freeCabins, setFreeCabins] = useState<string[] | null>(null);

  const saveState = async () => {
    switch (provider) {
      case Providers.infoflot: {
        const data = await getPricesInfoflot(id);
        setCabins(data.cabins);
        setFreeCabins(data.freeCabins);
        break;
      }
      case Providers.vodohod: {
        const data = await getPricesVodohod(id);
        setCabins(data.cabins);
        setFreeCabins(data.freeCabins);
        break;
      }

      default:
        console.log(
          'Для этого провайдера нет обработки для получения свободных кают'
        );
    }
  };

  useEffect(() => {
    saveState();
  }, []);

  return { cabins, freeCabins };
};
