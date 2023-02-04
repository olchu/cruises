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
