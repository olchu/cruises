export type CabinType = {
  name: string;
  price: Price;
};

type Price = {
  val: number;
  dicountedVal: number;
  annotation: string;
  description: string;
  thumbnails: string[];
};
export type PriceType = {
  name: string;
  cabinsType: CabinType[];
  hasPrice: boolean;
}[];


export type FreeCabinsType = Record<string, string[]>;

type DeckPrice = Record<string, Price>;

export type IncomingPrices = Record<string, DeckPrice>;
