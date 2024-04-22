import { PostsType } from '@/shared/types/prismaResponse';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import prisma from 'prisma/client';
import { ReactElement } from 'react';
import { MainLayout } from '@/layouts/main';
import { Image, Stack, Text, VStack, Box, Link } from '@chakra-ui/react';
import { MainContainer } from '@/shared/ui/mainContainer/MainContainer';
import { Heading } from '@/shared/ui/heading';
import moment from 'moment';
import NextLink from 'next/link';
import { IoIosArrowRoundForward } from 'react-icons/io';

type BlogProps = {
  posts: PostsType[];
};

const Blog = ({ posts }: BlogProps) => {
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

      <MainContainer
        px={{ base: 'section.mobile', lg: 'section.desktop' }}
        py={{ base: 'section.mobile', lg: 'section.desktop' }}
        h="full"
      >
        <Heading textAlign="left" mb={{ base: '20px' }}>
          Блог
        </Heading>
        <VStack w="full" gap="20px">
          {posts.map((post) => {
            const images = JSON.parse(post.images || '');
            console.log('type', typeof post.images);
            console.log('post.images', post.images);
            const formatedDate = moment(post.date).format('DD.MM.YYYY');
            return (
              <Stack
                key={post.id}
                flexDirection={{ base: 'column', md: 'row' }}
                w="full"
              >
                {images && (
                  <Box
                    // bg={`url(${images[0]})`}
                    bg={`url(/img/hero_bg.png);`}
                    width="300px"
                    height="150px"
                    bgPosition="center"
                    bgSize="cover"
                  />
                )}
                <VStack alignItems="flex-start" flex="1">
                  <Text fontSize="18px" fontWeight="bold">
                    {post.title}
                  </Text>
                  <Text color="grey" fontSize="12px">
                    {formatedDate}
                  </Text>
                  <Text>{post.preview}</Text>
                  <Link as={NextLink} href={`/blog/${post.id}`} display="flex" alignItems="center" gap="6px">
                    читать{' '}
                    <span>
                      <IoIosArrowRoundForward />
                    </span>
                  </Link>
                </VStack>
              </Stack>
            );
          })}
        </VStack>
      </MainContainer>
    </>
  );
};

export const getServerSideProps = (async (context) => {
  const { req } = context;

  const blogSelect = await prisma.blog.findMany({
    orderBy: {
      date: 'desc',
    },
    where: {
      publish: 'true',
    },
  });

  const posts: PostsType[] = JSON.parse(JSON.stringify(blogSelect));

  return {
    props: {
      posts,
    },
  };
}) satisfies GetServerSideProps<BlogProps>;

Blog.getLayout = function getLayout(page: ReactElement, props: BlogProps) {
  return <MainLayout>{page}</MainLayout>;
};

export default Blog;
