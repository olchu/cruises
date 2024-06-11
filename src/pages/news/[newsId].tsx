import { MainLayout } from '@/layouts/main';
import { NewsPrismaType } from '@/shared/types/prismaResponse';
import { MainContainer } from '@/shared/ui/mainContainer/MainContainer';
import { Box, Text } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import prisma from 'prisma/client';
import { ReactElement } from 'react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { PostimagesGallery } from '@/features/postimagesGallery';

export type NewsDetailsPageProps = {
  news: NewsPrismaType;
};

const NewsDetails = ({ news }: NewsDetailsPageProps) => {
  const formatedDate = format(news?.date!, 'dd MMMM yyyy', {
    locale: ru,
  });

  return (
    <>
      <Head>
        <title>{news?.title + ' ' + formatedDate}</title>

        {news?.preview && <meta name="description" content={news?.preview} />}

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

      <MainContainer p={{ base: 'section.mobile', lg: 'section.desktop' }}>
        <Text opacity="0.8" fontSize="14px">
          {formatedDate}
        </Text>
        {news?.title && (
          <Text
            as="h1"
            fontSize={{ base: '22px', lg: '28px' }}
            fontWeight="bold"
            whiteSpace="pre-wrap"
            mb="20px"
          >
            {news?.title}
          </Text>
        )}

        <Box
          mt="30px"
          whiteSpace="pre-wrap"
          className="compilationContainer"
          dangerouslySetInnerHTML={{
            __html: news?.preview || '',
          }}
        />
      </MainContainer>
    </>
  );
};

NewsDetails.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default NewsDetails;

export const getServerSideProps = (async (context) => {
  const newsId = parseInt(context.params?.newsId as string);

  if (isNaN(newsId))
    return {
      notFound: true,
    };

  const newsIdSelect = await prisma.news.findUnique({
    where: {
      id: newsId,
    },
  });
  const news = JSON.parse(JSON.stringify(newsIdSelect));

  return { props: { news: news } };
}) satisfies GetServerSideProps<NewsDetailsPageProps>;
