import { CruiseType, ShipsType } from '@/shared/types/prismaResponse';
import { ReactElement, useCallback, useEffect, useMemo, useState } from 'react';
import { MainLayout } from '@/layouts/main';
import { Heading, Stack } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { MainContainer } from '@/shared/ui/mainContainer/MainContainer';
import { getCities } from '@/shared/api/getCities';
import { getShips } from '@/shared/api/getShips';
import { AsideSearchPanel } from '@/features/asideSearchPanel';
import { defaultItemsOnPage } from '@/shared/constants/constants';
import { SearchResultContent } from '@/features/searchResultContent';
import Head from 'next/head';

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

  const search = useCallback(
    async (newSearch?: boolean) => {
      setIsFetching(true);
      const aditions = window.location.search ? '&' : '?'; //TODO to refactor

      const response = await fetch(
        'api/searchCruises' +
          window.location.search +
          aditions +
          `limit=${defaultItemsOnPage}&skip=${skip}`
      );

      const { cruises: cruisesRes, totalCount } = await response.json();

      setCruisesCount(totalCount);
      if (newSearch) {
        setCruises([...cruisesRes]);
        setSkip(0);
      } else {
        setCruises([...cruises, ...cruisesRes]);
        setSkip((prev) => prev + defaultItemsOnPage);
      }
      setIsLoading(false);
      setIsFetching(false);
    },
    [cruises, skip]
  );

  const handleGetMore = () => {
    search();
  };

  const handleSearch = useCallback(() => {
    setIsLoading(true);
    setCruises([]); //TODO to refactor
    search(true);
  }, [search]);

  useEffect(() => {
    search();
  }, []);

  return (
    <>
      <Head>
        <title>Результат поиска круизов.</title>
        <meta name="description" content="Результаты поиска круизов" />

        <meta name="keywords" content="Результаты поиска круизов" />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>

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
          direction={{ base: 'column', lg: 'row' }}
          alignItems="stretch"
        >
          <AsideSearchPanel
            ships={ships}
            citiesStart={citiesStart}
            citiesEnd={citiesEnd}
            isLoading={isLoading}
            handleSearch={handleSearch}
          />
          <SearchResultContent
            handleGetMore={handleGetMore}
            isLoading={isLoading}
            isFetching={isFetching}
            cruises={cruises}
            cruisesCount={cruisesCount}
          />
        </Stack>
      </MainContainer>
    </>
  );
};

SearchPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default SearchPage;

export const getServerSideProps = (async () => {
  const ships = await getShips();
  const citiesStart = await getCities('cityStart');
  const citiesEnd = await getCities('cityEnd');

  return { props: { ships, citiesStart, citiesEnd } };
}) satisfies GetServerSideProps<SearchPageProps>;
