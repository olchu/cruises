import { CruiseCard } from '@/entities/cruiseCard';
import { CruiseType } from '@/shared/types/prismaResponse';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import prisma from 'prisma/client';
import { ReactElement } from 'react';
import { MainContainer } from '@/shared/ui/mainContainer/MainContainer';
import { Box, Flex, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { HeroBlock } from '@/widgets/hero';
import { InfoBox } from '@/features/infoBox/ui/InfoBox';
import { MainLayout } from '@/layouts/main';
import UAParser from 'ua-parser-js';
import { StockWidget } from '@/widgets/stock';

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

      {/* <Box as="section" py="60px" bg="lightBlue" w="100%">
        <MainContainer>
          <Heading as="h2" size="xl" textAlign="center" mb="60px">
            Ближайшие круизы
          </Heading>
          <HStack gap="14px" w="full" overflow="scroll">
            {cruises.map((cruise) => {
              return <CruiseCard key={cruise.id} cruise={cruise} />;
            })}
          </HStack>
        </MainContainer>
      </Box>

      <MainContainer as="section" px="30px" py="60px">
        <Flex alignItems="center" h="full">
          <Box
            w="full"
            flex="1"
            bg="green"
            p="20px"
            color="white"
            background="linear-gradient(302deg, #003267 -9.31%, #3A8CBD 89.55%);"
          >
            <Text whiteSpace="pre-wrap" textAlign="left" fontSize="18px">
              {`Круиз на теплоходе — это уникальная возможность открыть для себя совершенно новый вид отдыха. Путешествие по воде поможет по-настоящему отдохнуть от городской суеты, ощутить полную гармонию с природой и познакомиться с многовековой историей самых интересных городов России.\n\nТуроператор «Волго-балтийские путешествия» предлагает Вам совершить незабываемую водную поездку.\n\nЧистый воздух, красивейшая природа России, интересная развлекательная программа — все это сделает отдых увлекательным и полезным.`}
            </Text>
          </Box>
          <Box
            w="full"
            flex="1"
            bg="red"
            height="100%"
            bgImage="/img/blueBlock.jpeg"
            bgPosition="center"
            bgSize="cover"
          >
            hello
          </Box>
        </Flex>
      </MainContainer>

      <MainContainer as="section" px="30px" pb="60px">
        <Heading as="h2" size="xl" textAlign="center" mb="60px">
          Круизные компании
        </Heading>
        <Flex alignItems="center" justifyContent="center" gap="40px">
          <Box
            w="120px"
            h="120px"
            bgImage="/logos/cesar.png"
            bgPosition="center"
            bgSize="contain"
            bgRepeat="no-repeat"
          />
          <Box
            w="120px"
            h="120px"
            bgImage="/logos/lebed.png"
            bgPosition="center"
            bgSize="contain"
            bgRepeat="no-repeat"
          />
          <Box
            w="120px"
            h="120px"
            bgImage="/logos/mosturflot.png"
            bgPosition="center"
            bgSize="contain"
            bgRepeat="no-repeat"
          />
        </Flex>
        <Flex alignItems="center" justifyContent="center" gap="40px" mt="40px">
          <Box
            w="160px"
            h="120px"
            bgImage="/logos/vodohod.svg"
            bgPosition="center"
            bgSize="contain"
            bgRepeat="no-repeat"
          />
          <Box
            w="160px"
            h="120px"
            bgImage="/logos/infoflot.png"
            bgPosition="center"
            bgSize="contain"
            bgRepeat="no-repeat"
          />
          <Box
            w="160px"
            h="120px"
            bgImage="/logos/knyaz.png"
            bgPosition="center"
            bgSize="contain"
            bgRepeat="no-repeat"
          />
        </Flex>
      </MainContainer> */}
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
