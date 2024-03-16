import {
  CruiseType,
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
import { CruisesCarousel } from '@/widgets/cruisesCarousel';
import { BlogPreview } from '@/features/blogPreview/ui/BlogPreview';
import { NewsPreview } from '@/features/newsPreview';
import { getShips } from '@/shared/api/getShips';
import { getCities } from '@/shared/api/getCities';
import { getSession } from 'next-auth/react';
import { Session } from 'next-auth';

interface HomeProps {
  cruises: CruiseType[];
  isMobileDevice: boolean;
  posts: PostsType[];
  ships: ShipsType[];
  citiesStart: CruiseType[];
  citiesEnd: CruiseType[];
  session: Session | null;
}

const Home = ({
  cruises,
  posts,
  ships,
  citiesStart,
  citiesEnd,
  session,
}: HomeProps) => {
  console.log('session', session);
  return (
    <>
      <Head>
        <title>
          Речные круизы на теплоходе по России 2024 | Цены, скидки, расписание
        </title>
        <meta
          name="description"
          content="Круизы на теплоходе по рекам России 2024. Цены, расписание и маршруты речных круизов из Москвы и других городов по рекам России на 2024 год. Все круизные компании в одном месте: Водоход, Созвездие, Мостурфлот, Донинтурфлот, Цезарь, Белый лебедь и другие. Скидки и акции на покупку речного тура."
        />
        <meta
          name="keywords"
          content="речные круизы по россии, круизы по россии 2024, речной круиз на теплоходе, речные круизы расписание"
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

      <HeroBlock
        ships={ships}
        citiesEnd={citiesEnd}
        citiesStart={citiesStart}
      />
      <StockWidget />

      {/* TODO о речных круизах */}


      {/* Рекомендации */}
      <CruisesCarousel cruises={cruises} />

      {/* Популярные напрвления */}
      
      <NewsPreview posts={posts} />

      <BlueBlock />

      <BlogPreview posts={posts} />

      <ProviderLogos />
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

  const blogSelect = await prisma.blog.findMany({
    orderBy: {
      date: 'desc',
    },
    where: {
      publish: 'true',
    },
    take: 3,
  });

  const cruises: CruiseType[] = JSON.parse(JSON.stringify(cruisesSelect));
  const posts: PostsType[] = JSON.parse(JSON.stringify(blogSelect));
  const ships = await getShips();
  const sortedShips = ships.sort((a, b) => {
    if (a.name.toLowerCase() < b.name.toLowerCase()) {
      return -1;
    }
    if (a.name.toLowerCase() > b.name.toLowerCase()) {
      return 1;
    }
    return 0;
  });
  const citiesStart = await getCities('cityStart');
  const citiesEnd = await getCities('cityEnd');

  const parser = new UAParser();
  const userAgentString = req?.headers['user-agent'] || '';
  const userAgent = parser.setUA(userAgentString).getResult();

  const isMobileDevice = userAgent.device.type === 'mobile';

  return {
    props: {
      cruises: cruises,
      isMobileDevice,
      posts,
      ships: sortedShips,
      citiesStart,
      citiesEnd,
      session,
    },
  };
}) satisfies GetServerSideProps<HomeProps>;

Home.getLayout = function getLayout(page: ReactElement, props: HomeProps) {
  return <MainLayout isMobileDevice={props.isMobileDevice}>{page}</MainLayout>;
};

export default Home;
