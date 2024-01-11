'use client';

import { WhiteTransparent } from '@/shared/ui/whiteTransparent/WhiteTransparent';
import { Button, Flex, BoxProps } from '@chakra-ui/react';
import { BiSolidShip } from 'react-icons/bi';
import { IoLocationSharp } from 'react-icons/io5';
import { FC } from 'react';
import { SearchBarInputDate, urlParamNames } from './SearchBarInputDate';
import { useRouter } from 'next/router';
import { SearchBarSelect } from './SearchBarSelect';
import { CruiseType, ShipsType } from '@/shared/types/prismaResponse';

type SearchBarProps = BoxProps & {
  ships?: ShipsType[];
  citiesEnd?: CruiseType[];
  citiesStart?: CruiseType[];
};

export const Search: FC<SearchBarProps> = (props) => {
  const { ships, citiesEnd, citiesStart, ...otherProps } = props;
  const router = useRouter();

  const handleSearch = () => {
    router.push({
      pathname: '/search',
      query: { ...router.query },
    });
  };

  return (
    <>
      <SearchBarInputDate
        placeholder="Отправление не ранее "
        urlParamName={urlParamNames.dateStart}
      />
      <SearchBarInputDate
        placeholder="Прибытие не ранее"
        urlParamName={urlParamNames.dateEnd}
      />
      <SearchBarSelect
        icon={<BiSolidShip />}
        placeholder="Теплоход"
        searchParamName="ship"
      >
        {ships &&
          ships.map((ship) => {
            return (
              <option key={ship.id} value={ship.id}>
                {ship.name}
              </option>
            );
          })}
      </SearchBarSelect>
      <SearchBarSelect
        placeholder="От куда"
        icon={<IoLocationSharp />}
        searchParamName="cityFrom"
      >
        {citiesStart &&
          citiesStart.map((city) => {
            return (
              <option key={city.cityStart} value={city.cityStart}>
                {city.cityStart}
              </option>
            );
          })}
      </SearchBarSelect>
      <SearchBarSelect
        placeholder="Куда"
        icon={<IoLocationSharp />}
        searchParamName="cityEnd"
      >
        {citiesEnd &&
          citiesEnd.map((city) => {
            return (
              <option key={city.cityEnd} value={city.cityEnd}>
                {city.cityEnd}
              </option>
            );
          })}
      </SearchBarSelect>
    </>
  );
};
