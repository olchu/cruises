import { SearchResultContent } from '@/features/searchResultContent';
import { MainLayout } from '@/layouts/main';
import { defaultItemsOnPage } from '@/shared/constants/constants';
import {
  CompilationQueryType,
  getCompilation,
} from '@/shared/lib/utils/getCompilation';
import { CruiseType, ShipsType } from '@/shared/types/prismaResponse';
import { MainContainer } from '@/shared/ui/mainContainer/MainContainer';
import { WhiteTransparent } from '@/shared/ui/whiteTransparent/WhiteTransparent';
import { Box, Stack, Text, VStack } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import prisma from 'prisma/client';
import { ReactElement, useCallback, useEffect, useMemo, useState } from 'react';
import { ReactSVG } from 'react-svg';

export type ShipDetailsPageProps = {
  ship: ShipsType | null;
  cruises: CruiseType[];
  totalCount: number;
};

const ShipDetails = ({
  ship,
  cruises: initialCruises,
  totalCount,
}: ShipDetailsPageProps) => {
  const captain = JSON.parse(ship?.captain || '');
  const [cruises, setCruises] = useState<CruiseType[]>(initialCruises);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [skip, setSkip] = useState(defaultItemsOnPage);

  const queries: CompilationQueryType[] = [{ shipId: [ship?.id] }];

  const handleBeforeInjection = (svg: SVGSVGElement) => {
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', 'auto');
  };

  const getCruises = useCallback(async () => {
    if (!queries) {
      setIsLoading(false);
      return;
    }
    setIsFetching(true);

    const response = await fetch(
      `/api/getCompilation?limit=${defaultItemsOnPage}&skip=${skip}`,
      {
        method: 'POST',
        body: JSON.stringify(queries),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const { cruises: cruisesRes, totalCount } = await response.json();

    setCruises([...cruises, ...(cruisesRes || [])]);
    setSkip((prev) => prev + defaultItemsOnPage);

    setIsLoading(false);
    setIsFetching(false);
  }, [queries, cruises, skip]);

  useEffect(() => {
    setCruises(initialCruises);
  }, [initialCruises]);

  const cruisesCount = useMemo(() => {
    return totalCount;
  }, [totalCount]);

  const handleGetMore = () => {
    getCruises();
  };
  return (
    <>
      <Head>
        <title>{`Теплоход ${ship?.name} расписание круизов на 2024 год | цены | фото | описание | маршруты `}</title>
        <meta
          name="description"
          content={`Купить круиз на теплоход ${ship?.name} по низкой цене на сайте vbp.ru. Навигация на 2024 год теплохода  ${ship?.name}.  Фото кают, маршруты, расписание, цены и программы экскурсий. Волго-Балтийские путешествия.`}
        />

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

      <VStack w="full" gap={0} alignItems="center">
        <Box
          w="full"
          h="200px"
          bgImage={ship?.img!}
          bgPosition="center"
          bgSize="cover"
        >
          <MainContainer mt={{ base: 'section.mobile', md: 'section.desktop' }}>
            <WhiteTransparent
              width={{ base: 'full', md: 'fit-content' }}
              p="12px"
            >
              <Text
                fontSize={{ base: '22px', lg: '28px' }}
                fontWeight="bold"
                whiteSpace="pre-wrap"
                color="white"
                px="30px"
              >
                {ship?.name}
              </Text>
            </WhiteTransparent>
          </MainContainer>
        </Box>

        <MainContainer p={{ base: 'section.mobile', lg: 'section.desktop' }}>
          <Stack
            display={{ base: 'column', md: 'row' }}
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Box>
              <Text fontSize="22px" fontWeight="bold" mb="12px">
                Сервисы на борту
              </Text>
              <Box
                whiteSpace="pre-wrap"
                dangerouslySetInnerHTML={{
                  __html: ship?.services || '',
                }}
              />
            </Box>
            {captain?.name && captain?.image && (
              <Box>
                <Text fontSize="22px" fontWeight="bold" textAlign="center">
                  Капитан
                </Text>
                <Box
                  mx="auto"
                  w="150px"
                  h="150px"
                  bgImage={captain?.image!}
                  bgPosition="center"
                  bgSize="cover"
                />
                <Text fontWeight="bold" textAlign="center">
                  {captain.name}
                </Text>
              </Box>
            )}
          </Stack>

          <Text fontSize="22px" fontWeight="bold" mb="12px">
            Описание
          </Text>
          <Box
            whiteSpace="pre-wrap"
            dangerouslySetInnerHTML={{
              __html: ship?.description || '',
            }}
          />

          <Box w="full">
            <ReactSVG
              src={ship?.scheme || ''}
              width="100%"
              beforeInjection={handleBeforeInjection}
            />
          </Box>
          <Text fontSize="22px" fontWeight="bold" mb="12px">
            Круизы
          </Text>
          <SearchResultContent
            handleGetMore={handleGetMore}
            isLoading={isLoading}
            isFetching={isFetching}
            cruises={cruises}
            cruisesCount={cruisesCount}
            itemsOnPage={defaultItemsOnPage}
          />
        </MainContainer>
      </VStack>
    </>
  );
};

ShipDetails.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default ShipDetails;

export const getServerSideProps = (async (context) => {
  const shipId = parseInt(context.params?.id as string);

  const shipSelect = await prisma.ships.findUnique({
    where: {
      id: shipId,
    },
  });
  const ship = JSON.parse(JSON.stringify(shipSelect));

  const query: CompilationQueryType[] = [{ shipId: [shipId] }];

  const { cruises, totalCount } = await getCompilation({
    query,
    itemsOnPage: defaultItemsOnPage,
  });

  return {
    props: {
      ship,
      cruises: cruises as CruiseType[],
      totalCount: totalCount as number,
    },
  };
}) satisfies GetServerSideProps<ShipDetailsPageProps>;
