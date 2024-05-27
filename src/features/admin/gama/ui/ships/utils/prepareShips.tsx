import { Providers } from '@/shared/constants/providers';
import { ShipsData } from '@/features/admin/vodohod/api/useGetShips';
import { renderToStaticMarkup } from 'react-dom/server';

export interface DBShipsData {
  extId: number;
  name: string;
  img: string;
  captain: string;
  anotation: string;
  description: string;
  about: string;
  scheme: string;
  services: string;
  images: string;
  loadFrom: string;
  active: number;
}

export const prepareShips = async (data: ShipsData[], token: string | null) => {
  const ships: DBShipsData[] = [];
  for (const i in data) {
    const item = data[i];
    const response = await fetch(
      `https://api-crs.vodohod.com/json/v3/motorship?id=${item.id}`,
      {
        method: 'Get',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const { result }: ShipDetails = await response.json();

    const images = item.media.map((img) => img.path);
    const servicesMap = (
      <ul>
        {item.features.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    );
    ships.push({
      extId: item.id,
      name: item.name,
      img: item.image,
      captain: JSON.stringify(result.captain),
      description: JSON.stringify(result.description),
      anotation: item.annotation,
      about: item.description,
      scheme: item.scheme,
      services: renderToStaticMarkup(servicesMap),
      images: JSON.stringify(images),
      loadFrom: Providers.vodohod,
      active: 1,
    });
  }

  return ships;
};

export interface ShipDetails {
  code: number;
  message: string;
  result: Result;
}

interface Result {
  id: number;
  name: string;
  slug: string;
  image: string;
  annotation: string;
  description: string;
  decks: string;
  motorshipDecks: MotorshipDeck[];
  roomClasses: ResultRoomClass[];
  captain: Captain;
  class: string;
  features: Feature[];
}

interface Captain {
  name: string;
  image: string;
}

interface Feature {
  id: number;
  name: string;
}

interface MotorshipDeck {
  id: number;
  name: string;
  motorship: number;
  metaType: number;
  roomClasses: RoomClass[];
  scheme: string;
  level: number;
  updatedAt: number;
  sort: number;
  meta_name: string;
  meta_id: number;
}

interface RoomClass {
  id: number;
  meta_id: number;
  meta_name: string;
}

interface ResultRoomClass {
  id: number;
  name: string;
  annotation: string;
  description: string;
  metaType: number;
  motorship: number;
  decks: RoomClass[];
  roomsAvailable: number;
  updatedAt: number;
  color: string;
  sort: number;
  meta_name: string;
  meta_id: number;
}
