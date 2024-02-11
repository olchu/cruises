import { Providers } from '@/shared/constants/providers';
import { ShipsData } from '@/features/admin/vodohod/api/useGetShips';
import { renderToStaticMarkup } from 'react-dom/server';

type CabisPhotos = Record<string, string[]>;

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
  cabinsPhoto: string;
}

export const prepareInfoflotShips = async (data: ShipResponse[]) => {
  const ships: DBShipsData[] = [];
  for (const i in data) {
    const item = data[i];

    const cabinsPhoto: Record<string, CabisPhotos> = {};

    for (const j in data[i].cabins) {
      const deck = data[i].cabins[j].deck.name;
      if (cabinsPhoto[deck]) {
        cabinsPhoto[deck] = {
          ...cabinsPhoto[deck],
          [data[i].cabins[j].typeId]: data[i].cabins[j].photos.map(
            (item) => item.filename
          ),
        };
      } else {
        cabinsPhoto[deck] = {
          [data[i].cabins[j].typeId]: data[i].cabins[j].photos.map(
            (item) => item.filename
          ),
        };
      }
    }

    const images = item?.photos?.map((img) => img.filename);

    const cap = {
      name: item?.captain,
      image: item?.files?.captainPhoto?.path,
    };

    ships.push({
      extId: item.id,
      name: item.name,
      img: item.files?.photo?.path,
      captain: JSON.stringify(cap),
      description: item.descriptionBig,
      anotation: item.description || '',
      about: '',
      scheme: item.svgScheme?.url,
      services: item.include,
      images: JSON.stringify(images),
      loadFrom: Providers.infoflot,
      active: 1,
      cabinsPhoto:JSON.stringify(cabinsPhoto),
    });
  }

  return ships;
};

interface ShipResponse {
  id: number;
  name: string;
  url: string;
  tagline: string;
  tagline2: string;
  stars: number;
  type: number;
  typeName: string;
  operatorId: number;
  operatorName: string;
  operatorBrandName: string;
  captain: string;
  criuseDirector: string;
  cruiseDirectorTel: string;
  restaurantDirector: string;
  description: null;
  descriptionBig: string;
  services: null;
  discounts: string;
  discountsNextYear: null;
  files: Files;
  capacity: number;
  foreignCurrency: number;
  '3dtour': string;
  video: string;
  social: Social;
  interestingFacts: string;
  include: string;
  project: null;
  decks: Deck[];
  cabins: Cabin[];
  photoArchive: string;
  workers: null;
  techSpecifications: TechSpecifications;
  additional: string;
  touristicProduct: string;
  excursionProgram: null;
  schemes: Scheme[];
  svgScheme: Scheme;
  photos: MainPhoto[];
  photoArchiveSize: number;
  interestingFactsPhotos: null;
  features: any[];
  specialFeatures: any[];
  currentCruiseId: null;
  onboardServices: string;
  publicPlaces: string;
  coordinates: null;
  reviews: any[];
  cabinTypes: CabinType[];
  sug: Sug[];
}

interface CabinType {
  id: number;
  name: string;
  description: string;
  group: number;
  photos: string[];
  isEko: boolean;
  position: number;
  friendlyName: FriendlyName;
  class: Amenities;
  amenities: Amenities;
  inRoomServices: string;
}

interface Amenities {
  id: number;
  name: string;
}

interface FriendlyName {
  ru: TypeFriendlyName | null;
  en: null;
}

enum TypeFriendlyName {
  CОкном = 'C окном',
}

interface Cabin {
  id: number;
  shipId: number;
  deckId: number;
  typeId: number;
  typeName: string;
  typeFriendlyName: TypeFriendlyName | null;
  cabinDescription: string;
  name: string;
  places: Places;
  deck: Amenities;
  photos: CabinPhoto[];
  typeDescription: string;
}

interface CabinPhoto {
  filename: string;
  filetype: Filetype;
  description: string;
}

enum Filetype {
  ImageJPEG = 'image/jpeg',
}

interface Places {
  main: number;
  additional: number;
}

interface Deck {
  id: number;
  name: string;
  position: number;
  shipId: number;
}

interface Files {
  photo: CaptainPhoto;
  scheme: CaptainPhoto;
  schemeEn: CaptainPhoto;
  schemeFlash: CaptainPhoto;
  captainPhoto: CaptainPhoto;
  cruiseDirectorPhoto: CaptainPhoto;
  restaurantDirectorPhoto: CaptainPhoto;
}

interface CaptainPhoto {
  name: string;
  path: string;
  type: string;
  size: string;
}

interface MainPhoto {
  position: number;
  filename: string;
  filetype: Filetype;
  filesize: number;
  description: string;
}

interface Scheme {
  id: number;
  dateStart: number;
  dateEnd: null;
  filename: string;
  url: string;
}

interface Social {
  vk: string;
  fb: string;
  ig: string;
  tw: string;
  yt: string;
  ok: string;
}

interface Sug {
  id: number;
  type2: number;
  type_name: string;
  type_show_in_filter: number;
  type_priority: number;
  title: string;
  label: string;
  descr: string;
  icon: string;
  amount: number;
  suggestion_access_rules: string;
  timeStart: Date;
  timeEnd: Date;
}

interface TechSpecifications {
  length: number;
  width: number;
  passengers: number;
  decks: null;
}
