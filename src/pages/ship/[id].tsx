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
import { Box, HStack, Img, Stack, Text, VStack } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import prisma from 'prisma/client';
import React, { ReactElement } from 'react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { ReactSVG } from 'react-svg';

export type ShipDetailsPageProps = {
  ship: ShipsType | null;
};

const ShipDetails = ({ ship }: ShipDetailsPageProps) => {
  const captain = JSON.parse(ship?.captain || '');

  const handleBeforeInjection = (svg: SVGSVGElement) => {
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', 'auto');
  };
  return (
    <>
      <Head>
        <title>{ship?.name || ''}</title>
        <meta name="description" content={''} />

        <meta name="keywords" content="" />

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

  return { props: { ship: ship } };
}) satisfies GetServerSideProps<ShipDetailsPageProps>;
