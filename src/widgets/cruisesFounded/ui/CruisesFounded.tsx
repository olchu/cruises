'use client';

import { NoCruiseFound } from '@/entities/noCruiseFound';
import { CruiseType } from '@/shared/types/prismaResponse';
import { VStack, Text, Button } from '@chakra-ui/react';
import { FC, useEffect, useMemo, useState } from 'react';

type CruisesFoundedProps = {
  cruises: CruiseType[];
};

const itemsOnPage = 2;

export const CruisesFounded: FC<CruisesFoundedProps> = ({
  cruises: initCruises,
}) => {
  const [cruises, setCruises] = useState<CruiseType[]>(initCruises);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [skip, setSkip] = useState(0);
  const [cruisesCount, setCruisesCount] = useState(0);

  const search = async () => {
    console.log('skip', skip);
    setIsFetching(true);
    const response = await fetch(
      'api/searchCruises' +
        window.location.search +
        `&limit=${itemsOnPage}&skip=${skip}`
    );
    const { cruises: cruisesRes, totalCount } = await response.json();
    console.log('responce', cruisesRes);
    console.log('totalCount', totalCount);
    setCruisesCount(totalCount);
    setCruises([...cruises, ...cruisesRes]);
    setSkip((prev) => prev + itemsOnPage);
    setIsLoading(false);
    setIsFetching(false);
  };

  const btnText = useMemo(() => {
    if (cruises.length === 0) return '';

    const difrent = cruisesCount - cruises.length;

    if (difrent > itemsOnPage) return `Загрузить еще ${itemsOnPage}`;
    else return `Загрузить еще ${difrent}`;
  }, [cruises, cruisesCount]);

  const handleGetMore = () => {
    search();
  };

  useEffect(() => {
    search();
  }, []);

  if (isLoading)
    return (
      <VStack
        w="full"
        h="full"
        alignItems="flex-start"
        p={{ base: '12px', lg: '18px' }}
      >
        <Text>isLoading</Text>
      </VStack>
    );

  return (
    <VStack
      w="full"
      h="full"
      alignItems="flex-start"
      p={{ base: '12px', lg: '18px' }}
    >
      {cruises?.length === 0 ? (
        <NoCruiseFound />
      ) : (
        <Text>Найдено {cruisesCount} круизов</Text>
      )}
      {cruises?.map((cruise) => {
        return <div key={cruise.id}>{cruise.title}</div>;
      })}
      {cruisesCount - cruises.length > 0 && (
        <Button
          onClick={handleGetMore}
          w="100%"
          bg="primary"
          color="white"
          isLoading={isFetching}
        >
          {btnText}
        </Button>
      )}
    </VStack>
  );
};
