'use client';

import { WhiteTransparent } from '@/shared/ui/whiteTransparent/WhiteTransparent';
import { Button, Text, Flex, BoxProps } from '@chakra-ui/react';
import { BiSolidShip } from 'react-icons/bi';
import { IoLocationSharp } from 'react-icons/io5';
import { FC, useState } from 'react';
import { SearchBarInputDate, urlParamNames } from './SearchBarInputDate';
import { useRouter } from 'next/router';
import { SearchBarSelect } from './SearchBarSelect';
import { CruiseType, ShipsType } from '@/shared/types/prismaResponse';

type SearchBarProps = BoxProps & {
  ships: ShipsType[];
  citiesEnd: CruiseType[];
  citiesStart: CruiseType[];
};

export const SearchBar: FC<SearchBarProps> = (props) => {
  const { ships, citiesEnd, citiesStart, ...otherProps } = props;
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSearch = () => {
    setIsLoading(true);
    router.push({
      pathname: '/search',
      query: { ...router.query },
    });
  };
  return (
    <WhiteTransparent
      p={{ base: 'section.mobile', lg: '12px' }}
      display="flex"
      flexDirection="column"
      alignItems="flex-end"
      w={{ base: '100%', lg: 'auto' }}
      {...otherProps}
    >
      <Flex
        gap={{ base: '10px' }}
        flexDirection={{ base: 'column', lg: 'row' }}
        alignItems={{ base: 'none', lg: 'flex-end' }}
        w="100%"
      >
        <SearchBarInputDate
          placeholder="Отправление"
          urlParamName={urlParamNames.dateStart}
        />
        <SearchBarInputDate
          placeholder="Прибытие"
          urlParamName={urlParamNames.dateEnd}
        />
        <SearchBarSelect
          icon={<BiSolidShip />}
          placeholder="Выбрать Теплоход"
          searchParamName="ship"
        >
          {ships.map((ship) => {
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
          {citiesStart.map((city) => {
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
          {citiesEnd.map((city) => {
            return (
              <option key={city.cityEnd} value={city.cityEnd}>
                {city.cityEnd}
              </option>
            );
          })}
        </SearchBarSelect>
        <Button
          isLoading={isLoading}
          onClick={handleSearch}
          w="100%"
          bg="accent"
          color="white"
        >
          Поиск
        </Button>
      </Flex>
      <Text color="accent" mt="12px" fontWeight="bold" mx={{base:"auto", lg:'inherit'}}>
        расширенный поиск
      </Text>
    </WhiteTransparent>
  );
};
