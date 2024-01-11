import { CruiseType, ShipsType } from '@/shared/types/prismaResponse';
import { ReactElement, useEffect, useMemo, useState } from 'react';
import { MainLayout } from '@/layouts/main';
import {
  Heading,
  Text,
  Stack,
  VStack,
  Button,
  Spinner,
  Box,
} from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { MainContainer } from '@/shared/ui/mainContainer/MainContainer';
import { Search } from '@/features/search';
import { NoCruiseFound } from '@/entities/noCruiseFound';
import { getCities } from '@/shared/api/getCities';
import { getShips } from '@/shared/api/getShips';
import { Loading } from '@/shared/ui/loading';
import { IoMdRepeat } from 'react-icons/io';

const itemsOnPage = 10;

export type SearchPageProps = {
  ships: ShipsType[];
  citiesStart: CruiseType[];
  citiesEnd: CruiseType[];
};

const SearchPage = ({ ships, citiesStart, citiesEnd }: SearchPageProps) => {
  const [cruises, setCruises] = useState<CruiseType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [skip, setSkip] = useState(0);
  const [cruisesCount, setCruisesCount] = useState(0);

  const search = async (newSearch?: boolean) => {
    setIsFetching(true);
    const aditions = window.location.search ? '&' : '?'; //TODO переделать

    const response = await fetch(
      'api/searchCruises' +
        window.location.search +
        aditions +
        `limit=${itemsOnPage}&skip=${skip}`
    );
    const { cruises: cruisesRes, totalCount } = await response.json();

    setCruisesCount(totalCount);
    if (newSearch) {
      setCruises([...cruisesRes]);
      setSkip(0);
    } else {
      setCruises([...cruises, ...cruisesRes]);
      setSkip((prev) => prev + itemsOnPage);
    }
    setIsLoading(false);
    setIsFetching(false);
  };

  const btnText = useMemo(() => {
    if (cruises.length === 0) return '';

    const difrent = cruisesCount - cruises.length;

    return `Показать еще ${difrent > itemsOnPage ? itemsOnPage : difrent}`;
  }, [cruises, cruisesCount]);

  const handleGetMore = () => {
    search();
  };

  const handleSearch = () => {
    setIsLoading(true);
    setCruises([]);
    search(true);
  };

  useEffect(() => {
    search();
  }, []);

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
        alignItems="stretch"
      >
        <VStack
          width="350px"
          position="sticky"
          bg="white"
          top="0"
          alignItems="flex-start"
          p={{ base: '12px', lg: '18px' }}
          shadow="md"
          height="550px"
          gap="18px"
        >
          <Search
            ships={ships}
            citiesStart={citiesStart}
            citiesEnd={citiesEnd}
          />
          <Button
            onClick={handleSearch}
            w="100%"
            bg="primary"
            color="white"
            isLoading={isLoading}
          >
            Поиск
          </Button>
        </VStack>

        {isLoading ? (
          <VStack
            w="full"
            h="full"
            alignItems="center"
            alignSelf="center"
            justifyContent="center"
            p={{ base: '12px', lg: '18px' }}
          >
            <Spinner size="lg" />
          </VStack>
        ) : (
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
                color="primary"
                variant="outline"
                isLoading={isFetching}
                margin="0 auto"
              >
                <Text as="span" mr="8px">
                  <IoMdRepeat />
                </Text>
                {btnText}
              </Button>
            )}
          </VStack>
        )}
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
