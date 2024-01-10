import { CruiseType, ShipsType } from '@/shared/types/prismaResponse';
import { ReactElement, useEffect, useState } from 'react';
import { MainLayout } from '@/layouts/main';
import {
  HStack,
  Heading,
  Box,
  Link,
  Text,
  Stack,
  VStack,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import prisma from 'prisma/client';
import { GetServerSideProps } from 'next';
import { MainContainer } from '@/shared/ui/mainContainer/MainContainer';
import { TbShipOff } from 'react-icons/tb';
import { Search } from '@/features/search';
import { NoCruiseFound } from '@/entities/noCruiseFound';
import { CruisesFounded } from '@/widgets/cruisesFounded/ui/CruisesFounded';
import { getCities } from '@/shared/api/getCities';
import { getShips } from '@/shared/api/getShips';

export type SearchPageProps = {
  ships: ShipsType[];
  citiesStart: CruiseType[];
  citiesEnd: CruiseType[];
};

const SearchPage = ({ ships, citiesStart, citiesEnd }: SearchPageProps) => {
  return (
    <MainContainer
      as="section"
      overflow="hidden"
      px={{ base: 'section.mobile', lg: 'section.desktop' }}
      py={{ base: 'section.mobile', lg: 'section.desktop' }}
      maxW={'1400px'}
      h="full"
    >
      <Heading
        as="h1"
        size="lg"
        mb={{ base: '12px', lg: '18px' }}
        color="primary"
      >
        Поиск Круизов
      </Heading>
      <Stack
        justifyContent="flex-start"
        w="full"
        flex={1}
        gap={{ base: 'section.mobile', lg: 'section.desktop' }}
        direction={{ base: 'column', md: 'row' }}
      >
        <VStack
          w="350px"
          bg="white"
          h="full"
          alignItems="flex-start"
          p={{ base: '12px', lg: '18px' }}
          shadow="md"
          gap="18px"
        >
          <Search
            ships={ships}
            citiesStart={citiesStart}
            citiesEnd={citiesEnd}
          />
        </VStack>
        <CruisesFounded />
      </Stack>
    </MainContainer>
  );
};

SearchPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default SearchPage;

export const getServerSideProps = (async (context) => {
  const ships = await getShips();
  const citiesStart = await getCities('cityStart');
  const citiesEnd = await getCities('cityEnd');

  return { props: { ships, citiesStart, citiesEnd } };
}) satisfies GetServerSideProps<SearchPageProps>;
