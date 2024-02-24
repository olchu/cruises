import { CruiseShortAbout } from '@/entities/cruiseDetails';
import { FreeCabinsType } from '@/entities/cruiseDetails/type/cruisePrices';
import { CruiseBody } from '@/entities/cruiseDetails/ui/cruiseBody/CruiseBody';
import { useGetPricesInfoflot } from '@/entities/cruiseDetails/utils/useGetPricesInfoflot';
import { MainLayout } from '@/layouts/main';
import { CruiseType, ShipsType } from '@/shared/types/prismaResponse';
import { MainContainer } from '@/shared/ui/mainContainer/MainContainer';
import { WhiteTransparent } from '@/shared/ui/whiteTransparent/WhiteTransparent';
import { Box, Text, VStack } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import prisma from 'prisma/client';
import React, { ReactElement } from 'react';

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
  freeCabins: string[] | null;
  cabins: FreeCabinsType | null;
};

const CtuiseDetails = ({ cruise, ship }: CruiseDetailsPageProps) => {
  const { cabins, freeCabins } = useGetPricesInfoflot(cruise?.extId);

  return (
    <CruiseContext.Provider value={{ cruise, ship, cabins, freeCabins }}>
      <VStack w="full" gap={0} alignItems="center">
        <Box
          w="full"
          h="200px"
          bgImage={cruise?.image}
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
        id: cruise.shipId,
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
