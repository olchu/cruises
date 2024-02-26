import { CruiseContext } from '@/pages/cruise/[cruiseId]';
import { Providers } from '@/shared/constants/providers';
import { useContext } from 'react';
import { InfoflotSchema } from './InfoflotSchema';

export type SchemaProp = {
  chooseCabins: string[];
  handleChoose: (v: string) => void;
  orderOpen: () => void;
};

export const Schema = (props: SchemaProp) => {
  const { cruise } = useContext(CruiseContext);
  if (cruise?.loadFrom === Providers.infoflot)
    return <InfoflotSchema {...props} />;
  return null;
};
