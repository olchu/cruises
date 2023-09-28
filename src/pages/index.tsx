import MainLayout from '@/layouts/main';
import { CruiseCard } from '@/entities/cruiseCard';
import { CruiseType } from '@/shared/types/prismaResponse';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import prisma from 'prisma/client';

interface HomeProps {
  data: {
    cruises: CruiseType[];
  };
}

const Home = ({ data }: HomeProps) => {
  const { cruises } = data;
  console.log('Data', data);
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
        {cruises.map((cruise) => {
          return (
            <div key={cruise.id}>
              <CruiseCard cruise={cruise} />
            </div>
          );
        })}
      </section>
    </>
  );
};
Home.layout = MainLayout;
export default Home;

export const getStaticProps: GetStaticProps<{
  data: any;
}> = async () => {
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

  const cruises = JSON.parse(JSON.stringify(cruisesSelect));

  return {
    props: { data: { cruises: cruises || [] } },
  };
};
