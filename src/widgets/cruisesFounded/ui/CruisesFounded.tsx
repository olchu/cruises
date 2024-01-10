'use client';

import { NoCruiseFound } from '@/entities/noCruiseFound';
import { CruiseType } from '@/shared/types/prismaResponse';
import { VStack, Text, Button, Spinner } from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';

const itemsOnPage = 10;

export const CruisesFounded = () => {
  const [cruises, setCruises] = useState<CruiseType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [skip, setSkip] = useState(0);
  const [cruisesCount, setCruisesCount] = useState(0);

  const search = async () => {
    setIsFetching(true);
    const aditions = window.location.search ? '&' : '?'; //TODO переделать
    console.log('aditions', aditions);
    const response = await fetch(
      'api/searchCruises' +
        window.location.search +
        aditions +
        `limit=${itemsOnPage}&skip=${skip}`
    );
    const { cruises: cruisesRes, totalCount } = await response.json();
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
        <Spinner size="xl" />
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
        <Text>
          Найдено <b>{cruisesCount}</b> круизов
        </Text>
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
