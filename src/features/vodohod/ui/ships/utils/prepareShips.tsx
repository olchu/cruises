import { Providers } from '@/constants/providers';
import { ShipsData } from '@/features/vodohod/api/useGetShips';
import { renderToStaticMarkup } from 'react-dom/server';

export interface DBShipsData {
  extId: number;
  name: string;
  img: string;
  anotation: string;
  about: string;
  scheme: string;
  services: string;
  images: string;
  loadFrom: string;
}

export const prepareShips = (data: ShipsData[]): DBShipsData[] => {
  return data.map((item) => {
    const images = item.media.map((img) => img.path);
    const servicesMap = (
      <ul>
        {item.features.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    );

    return {
      extId: item.id,
      name: item.name,
      img: item.image,
      anotation: item.annotation,
      about: item.description,
      scheme: item.scheme,
      services: renderToStaticMarkup(servicesMap),
      images: JSON.stringify(images),
      loadFrom: Providers.vodohod,
    };
  });
};
