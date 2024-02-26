import { CruiseContext } from '@/pages/cruise/[cruiseId]';
import { Providers } from '@/shared/constants/providers';
import { useContext } from 'react';
import { InfoflotSchema } from './InfoflotSchema';
import { VodohodSchema } from './VodohodSchema';

export type SchemaProp = {
  chooseCabins: string[];
  handleChoose: (v: string) => void;
  orderOpen: () => void;
};

export const Schema = (props: SchemaProp) => {
  const { cruise } = useContext(CruiseContext);

  switch (cruise?.loadFrom) {
    case Providers.infoflot: {
      return <InfoflotSchema {...props} />;
    }
    case Providers.vodohod: {
      return <VodohodSchema {...props} />;
    }

    default:
      return null;
  }
};
