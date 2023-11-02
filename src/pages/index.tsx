import MainLayout from '@/layouts/main';
import { CruiseCard } from '@/entities/cruiseCard';
import { CruiseType } from '@/shared/types/prismaResponse';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import prisma from 'prisma/client';
import { ReactElement } from 'react';
import { MainContainer } from '@/shared/ui/mainContainer/MainContainer';

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

      <section>
        <MainContainer>
          {cruises.map((cruise) => {
            return (
              <div key={cruise.id}>
                <CruiseCard cruise={cruise} />
              </div>
            );
          })}
        </MainContainer>
      </section>
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
