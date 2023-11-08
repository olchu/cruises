/* eslint-disable jsx-a11y/alt-text */
import MainLayout from '@/layouts/main';
import { CruiseCard } from '@/entities/cruiseCard';
import { CruiseType } from '@/shared/types/prismaResponse';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import prisma from 'prisma/client';
import { ReactElement } from 'react';
import { MainContainer } from '@/shared/ui/mainContainer/MainContainer';
import {
  Box,
  Flex,
  Heading,
  HStack, Text,
  VStack
} from '@chakra-ui/react';
import { HeroBlock } from '@/features/hero';
import { InfoBox } from '@/features/infoBox/ui/InfoBox';

interface HomeProps {
  cruises: CruiseType[];
}

const Home = ({ cruises }: HomeProps) => {
  console.log('Data', cruises);
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

      <MainContainer as="section" px="30px" py="60px" h="550px">
        <HStack gap="20px" justifyContent="stretch" h="full">
          <VStack gap="20px" flex={1} h="full">
            <HStack gap="20px" flex={1} w="full">
              <InfoBox
                w="60%"
                img="/img/2.jpeg"
                title="Круизы по черному морю"
                description="Рассписание на 2023 год"
                url="#"
              />
              <InfoBox
                w="40%"
                img="/img/3.jpeg"
                title="Скидка 11% + 5%"
                description="Сезонная скидка до 15 марта"
                url="#"
              />
            </HStack>
            <HStack gap="20px" flex={1} w="full">
              <InfoBox
                w="40%"
                img="/img/4.jpeg"
                title="Эконом класс стал еще дешевле"
                description="Скидка 20% до 31 января"
                url="#"
              />
              <InfoBox
                w="60%"
                img="/img/5.jpeg"
                title="Супер Акция!!!"
                description="Тут будет название акции"
                url="#"
              />
            </HStack>
          </VStack>
          <InfoBox
            w="35%"
            img="/img/1.jpeg"
            title="Акция “дети бесплатно”"
            description="Семейные круизы по рекам России"
            url="#"
          />
        </HStack>
      </MainContainer>

      <Box as="section" py="60px" bg="lightBlue" w="100%">
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
            w="190px"
            h="120px"
            bgImage="/logos/cesar.png"
            bgPosition="center"
            bgSize="contain"
            bgRepeat="no-repeat"
          />
          <Box
            w="190px"
            h="120px"
            bgImage="/logos/lebed.png"
            bgPosition="center"
            bgSize="contain"
            bgRepeat="no-repeat"
          />
          <Box
            w="190px"
            h="120px"
            bgImage="/logos/mosturflot.png"
            bgPosition="center"
            bgSize="contain"
            bgRepeat="no-repeat"
          />
        </Flex>
        <Flex alignItems="center" justifyContent="center" gap="40px" mt="40px">
          <Box
            w="294px"
            h="120px"
            bgImage="/logos/vodohod.svg"
            bgPosition="center"
            bgSize="contain"
            bgRepeat="no-repeat"
          />
          <Box
            w="270px"
            h="120px"
            bgImage="/logos/infoflot.png"
            bgPosition="center"
            bgSize="contain"
            bgRepeat="no-repeat"
          />
          <Box
            w="280px"
            h="120px"
            bgImage="/logos/knyaz.png"
            bgPosition="center"
            bgSize="contain"
            bgRepeat="no-repeat"
          />
        </Flex>
      </MainContainer>
    </>
  );
};

export const getServerSideProps = (async () => {
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

  return { props: { cruises: cruises } };
}) satisfies GetServerSideProps<{
  cruises: CruiseType[];
}>;

Home.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Home;
