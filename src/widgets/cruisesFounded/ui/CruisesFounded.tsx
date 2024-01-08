'use client';

import { NoCruiseFound } from '@/entities/noCruiseFound';
import { CruiseType } from '@/shared/types/prismaResponse';
import { VStack, Text } from '@chakra-ui/react';
import { FC, useMemo, useState } from 'react';

type CruisesFoundedProps = {
  cruises: CruiseType[] | null;
};

const itemsOnPage = 5;

export const CruisesFounded: FC<CruisesFoundedProps> = ({ cruises }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [cruiseSlice, setCruiseSlice] = useState(
    cruises?.slice(0, itemsOnPage)
  );

  const pagesSum = useMemo(() => {
    const ceil = Math.floor(cruises!.length / itemsOnPage);
    return cruises!.length % itemsOnPage > 0 ? ceil + 1 : ceil;
  }, [cruises]);

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
        <Text>Найдено {cruises?.length} круизов</Text>
      )}
      {cruiseSlice?.map((cruise) => {
        return <div key={cruise.id}>{cruise.title}</div>;
      })}

      <div>Страниц{pagesSum}</div>
      
    </VStack>
  );
};
