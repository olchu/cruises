import { CruiseContext } from '@/pages/cruise/[cruiseId]';
import { Providers } from '@/shared/constants/providers';
import { useContext } from 'react';
import { InfoflotSchema } from './InfoflotSchema';

export const Schema = () => {
  const { cruise } = useContext(CruiseContext);
  if (cruise?.loadFrom === Providers.infoflot) return <InfoflotSchema />;
  return null;
};
