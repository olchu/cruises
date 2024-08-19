import {
  CruiseType,
  HeroPrismaType,
  NewsPrismaType,
  PostsType,
  ShipsType,
} from '@/shared/types/prismaResponse';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import prisma from 'prisma/client';
import { ReactElement } from 'react';
import { HeroBlock } from '@/widgets/hero';
import { MainLayout } from '@/layouts/main';
import UAParser from 'ua-parser-js';
import { StockWidget } from '@/widgets/stock';
import { BlueBlock } from '@/entities/blueBlock';
import { ProviderLogos } from '@/entities/providerLogos';
import { CruisesCarousel } from '@/entities/cruisesCarousel';
import { BlogPreview } from '@/features/blogPreview/ui/BlogPreview';
import { NewsPreview } from '@/features/newsPreview';
import { getShips } from '@/shared/api/getShips';
import { getCities } from '@/shared/api/getCities';
import { getSession } from 'next-auth/react';
import { Session } from 'next-auth';
import { Recommendations } from '@/widgets/recommendations';
import { Box } from '@chakra-ui/react';
import { SearchBar } from '@/features/searchBar';
import { MainContainer } from '@/shared/ui/mainContainer/MainContainer';
import { Heading } from '@/shared/ui/heading';

interface HomeProps {
  cruises: CruiseType[];
  isMobileDevice: boolean;
  posts: PostsType[];
  ships: ShipsType[];
  citiesStart: string[];
  citiesEnd: string[];
  session: Session | null;
  heroList: HeroPrismaType[];
  menu?: string;
  news: NewsPrismaType[];
}

const Home = ({
  cruises,
  posts,
  ships,
  citiesStart,
  citiesEnd,
  session,
  heroList,
  menu,
  news,
}: HomeProps) => {
  return (
    <>
      <Head>
        <title>Круизная компания - Волгобалтийские Путешествия</title>
        <meta name="yandex-verification" content="0f21d991a2575655" />

        <meta
          name="description"
          content="Продаем речные туры на теплоходах по рекам России на 2024 год. Актуальные цены, расписание теплоходов и маршруты."
        />

        <meta
          name="keywords"
          content="Круизная компания - Волгобалтийские Путешествия"
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

      <Box as="section" w="full" position="relative">
        <HeroBlock heroList={heroList} />
        <MainContainer
          display={{ base: 'none', lg: 'flex' }}
          position="absolute"
          zIndex="2"
          bottom="60px"
          left="50%"
          transform="translateX(-50%)"
        >
          <SearchBar
            ships={ships}
            citiesEnd={citiesEnd}
            citiesStart={citiesStart}
          />
        </MainContainer>
      </Box>

      <StockWidget />

      <MainContainer
        display={{ base: 'flex', lg: 'none' }}
        flexDirection="column"
      >
        <Heading mb={{ base: '20px' }}>Поиск</Heading>
        <SearchBar
          ships={ships}
          citiesEnd={citiesEnd}
          citiesStart={citiesStart}
        />
      </MainContainer>

      {/* TODO о речных круизах */}

      {/* Рекомендации */}
      {/* <Recommendations /> */}
      {/* <CruisesCarousel cruises={cruises} /> */}

      {/* Популярные напрвления */}

      <NewsPreview news={news} />

      <BlueBlock />

      <BlogPreview posts={posts} />

      {/* <ProviderLogos /> */}
    </>
  );
};

export const getServerSideProps = (async (context) => {
  const { req } = context;
  const session = await getSession(context);
  const cruisesSelect = await prisma.cruises.findMany({
    where: {
      dateStart: {
        gte: new Date(Date.now()),
      },
    },
    take: 20,
  });

  const heroSelect = await prisma.hero.findMany({
    orderBy: {
      order: 'asc',
    },
    where: {
      active: 1,
    },
  });
  const heroList: HeroPrismaType[] = JSON.parse(JSON.stringify(heroSelect));

  const blogSelect = await prisma.blog.findMany({
    orderBy: {
      date: 'desc',
    },
    where: {
      publish: 'true',
    },
    take: 3,
  });

  const newsSelect = await prisma.news.findMany({
    orderBy: {
      date: 'desc',
    },
    where: {
      publish: 'true',
    },
    take: 4,
  });

  const cruises: CruiseType[] = JSON.parse(JSON.stringify(cruisesSelect));
  const posts: PostsType[] = JSON.parse(JSON.stringify(blogSelect));
  const ships = await getShips();
  const citiesStart = await getCities('cityStart');
  const citiesEnd = await getCities('cityEnd');
  const news = JSON.parse(JSON.stringify(newsSelect));

  const parser = new UAParser();
  const userAgentString = req?.headers['user-agent'] || '';
  const userAgent = parser.setUA(userAgentString).getResult();

  const isMobileDevice = userAgent.device.type === 'mobile';

  return {
    props: {
      cruises: cruises,
      isMobileDevice,
      posts,
      ships,
      citiesStart,
      citiesEnd,
      session,
      heroList,
      news,
    },
  };
}) satisfies GetServerSideProps<HomeProps>;

Home.getLayout = function getLayout(page: ReactElement, props: HomeProps) {
  return <MainLayout isMobileDevice={props.isMobileDevice}>{page}</MainLayout>;
};

export default Home;
