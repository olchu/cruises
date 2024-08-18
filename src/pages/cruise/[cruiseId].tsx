import { CruiseShortAbout } from '@/entities/cruiseDetails';
import { CruiseBody } from '@/entities/cruiseDetails/ui/cruiseBody/CruiseBody';
import {
  FreeCabinsType,
  FreeCabinsWithIDType,
  useGetFreeCabins,
} from '@/entities/cruiseDetails/utils/useGetPrice';
import { MainLayout } from '@/layouts/main';
import { Providers } from '@/shared/constants/providers';
import { CruiseType, ShipsType } from '@/shared/types/prismaResponse';
import { MainContainer } from '@/shared/ui/mainContainer/MainContainer';
import { WhiteTransparent } from '@/shared/ui/whiteTransparent/WhiteTransparent';
import { Box, Text, VStack } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import prisma from 'prisma/client';
import React, { ReactElement } from 'react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { domainUrl } from '@/shared/constants/constants';

const initialState: CruiseDetailsPageProps = {
  cruise: null,
  ship: null,
  cabins: null,
  freeCabins: null,
};

export const CruiseContext = React.createContext(initialState);

export type CruiseDetailsPageProps = {
  cruise: CruiseType | null;
  ship: ShipsType | null;
  freeCabins: FreeCabinsWithIDType[] | null;
  cabins: FreeCabinsType | null;
};

const CtuiseDetails = ({ cruise, ship }: CruiseDetailsPageProps) => {
  const { cabins, freeCabins } = useGetFreeCabins({
    id: cruise?.extId,
    provider: cruise?.loadFrom as Providers,
  });

  const formatedStart = format(cruise?.dateStart!, 'dd MMMM yyyy', {
    locale: ru,
  });
  const formatedEnd = format(cruise?.dateEnd!, 'dd MMMM yyyy', {
    locale: ru,
  });

  const price = cruise?.minDiscountPrice || cruise?.minPrice;

  const baseTitle = `${
    cruise?.title || cruise?.cityStart + ' ' + cruise?.cityEnd
  } от ${(price! / 100)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} руб./чел. Даты ${formatedStart} - 
 ${formatedEnd}.`;

  return (
    <>
      <Head>
        <title>
          {baseTitle + ' Купить билеты на сайте Волгобалтийские Путешествия'}
        </title>

        <meta name="description" content={baseTitle + cruise?.shortRoute} />

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
      <CruiseContext.Provider value={{ cruise, ship, cabins, freeCabins }}>
        <VStack w="full" gap={0} alignItems="center">
          <Box
            w="full"
            h="200px"
            bgImage={`${domainUrl}${cruise?.image || cruise?.shipImg || ''}`}
            bgPosition="center"
            bgSize="cover"
          >
            {cruise?.title && (
              <MainContainer
                mt={{ base: 'section.mobile', md: 'section.desktop' }}
              >
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
                    {cruise?.title}
                  </Text>
                </WhiteTransparent>
              </MainContainer>
            )}
          </Box>

          <CruiseShortAbout />

          <CruiseBody />
        </VStack>
      </CruiseContext.Provider>
    </>
  );
};

CtuiseDetails.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default CtuiseDetails;

export const getServerSideProps = (async (context) => {
  const cruiseId = parseInt(context.params?.cruiseId as string);

  if (!isNaN(cruiseId)) {
    const cruiseSelect = await prisma.cruises.findUnique({
      where: {
        id: cruiseId,
      },
    });
    const cruise = JSON.parse(JSON.stringify(cruiseSelect));

    const shipSelect = await prisma.ships.findUnique({
      where: {
        id: cruise?.shipId,
      },
    });
    const ship = JSON.parse(JSON.stringify(shipSelect));

    return { props: { cruise: cruise, ship: ship } };
  }

  return { props: { cruise: null, ship: null } };
}) satisfies GetServerSideProps<{
  cruise: CruiseType | null;
  ship: ShipsType | null;
}>;
