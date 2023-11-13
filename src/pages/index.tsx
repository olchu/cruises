import { CruiseCard } from '@/entities/cruiseCard';
import { CruiseType } from '@/shared/types/prismaResponse';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import prisma from 'prisma/client';
import { ReactElement } from 'react';
import { MainContainer } from '@/shared/ui/mainContainer/MainContainer';
import { Box, Flex, HStack, Text, VStack } from '@chakra-ui/react';
import { HeroBlock } from '@/widgets/hero';
import { InfoBox } from '@/features/infoBox/ui/InfoBox';
import { MainLayout } from '@/layouts/main';
import UAParser from 'ua-parser-js';
import { StockWidget } from '@/widgets/stock';
import { BlueBlock } from '@/entities/blueBlock';
import { ProviderLogos } from '@/entities/providerLogos';
import { Heading } from '@/shared/ui/heading';

interface HomeProps {
  cruises: CruiseType[];
  isMobileDevice: boolean;
}

const Home = ({ cruises, isMobileDevice }: HomeProps) => {
  return (
    <>
      <Head>
        <title>
          Речные круизы на теплоходе по России 2023 | Цены, скидки, расписание
        </title>
        <meta
          name="description"
          content="Круизы на теплоходе по рекам России 2023. Цены, расписание и маршруты речных круизов из Москвы и других городов по рекам России на 2023 год. Все круизные компании в одном месте: Водоход, Созвездие, Мостурфлот, Донинтурфлот, Цезарь, Белый лебедь и другие. Скидки и акции на покупку речного тура."
        />
        <meta
          name="keywords"
          content="речные круизы по россии, круизы по россии 2023, речной круиз на теплоходе, речные круизы расписание"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HeroBlock />

      <StockWidget />

      <Box as="section" py="60px" bg="lightBlue" w="100%">
        <MainContainer>
          <Heading>Ближайшие круизы</Heading>
          <HStack gap="14px" w="full" overflow="scroll">
            {cruises.map((cruise) => {
              return <CruiseCard key={cruise.id} cruise={cruise} />;
            })}
          </HStack>
        </MainContainer>
      </Box>

      <BlueBlock />

      <ProviderLogos />
    </>
  );
};

export const getServerSideProps = (async ({ req }) => {
  const cruisesSelect = await prisma.cruises.findMany({
    orderBy: {
      dateStart: 'asc',
    },
    where: {
      dateStart: {
        gte: new Date(Date.now()),
      },
    },
    take: 20,
  });

  const cruises: CruiseType[] = JSON.parse(JSON.stringify(cruisesSelect));

  const parser = new UAParser();
  const userAgentString = req?.headers['user-agent'] || '';
  const userAgent = parser.setUA(userAgentString).getResult();

  const isMobileDevice = userAgent.device.type === 'mobile';

  return { props: { cruises: cruises, isMobileDevice } };
}) satisfies GetServerSideProps<{
  cruises: CruiseType[];
  isMobileDevice: boolean;
}>;

Home.getLayout = function getLayout(page: ReactElement, props: HomeProps) {
  return <MainLayout isMobileDevice={props.isMobileDevice}>{page}</MainLayout>;
};

export default Home;
