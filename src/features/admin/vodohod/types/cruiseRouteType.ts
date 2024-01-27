export type ExcursionType = {
  duration: number;
  name: string;
  annotation: string;
  description: string;
  groupSize: string;
};

export type InfoRouteType = {
  city: number | string;
  dateIn: number;
  dateOut: number;
  annotation: string;
  excursions: ExcursionType[];
  extraExcursions: ExcursionType[];
};

export type RouteObjectType = Record<string, InfoRouteType[]>;
