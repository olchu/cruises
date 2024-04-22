import { CruiseShortAbout } from '@/entities/cruiseDetails';
import { CruiseBody } from '@/entities/cruiseDetails/ui/cruiseBody/CruiseBody';
import {
  FreeCabinsType,
  FreeCabinsWithIDType,
  useGetFreeCabins,
} from '@/entities/cruiseDetails/utils/useGetPrice';
import { MainLayout } from '@/layouts/main';
import { Providers } from '@/shared/constants/providers';
import {
  CruiseType,
  PostsType,
  ShipsType,
} from '@/shared/types/prismaResponse';
import { MainContainer } from '@/shared/ui/mainContainer/MainContainer';
import { WhiteTransparent } from '@/shared/ui/whiteTransparent/WhiteTransparent';
import { Box, Text, VStack } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import prisma from 'prisma/client';
import React, { ReactElement } from 'react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

type PostProps = {
  post: PostsType | null;
};

const Post = ({ post }: PostProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={title} />

        <meta
          name="keywords"
          content={
            cruise?.title + ' ' + cruise?.shortRoute.replaceAll(' → ', ' ')
          }
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
      <VStack w="full" gap={0} alignItems="center">
        <Box
          w="full"
          h="200px"
          bgImage={cruise?.image || cruise?.shipImg || ''}
          bgPosition="center"
          bgSize="cover"
        >
          {cruise?.title && (
            <MainContainer
              mt={{ base: 'section.mobile', md: 'section.desktop' }}
            >
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
                  {cruise?.title}
                </Text>
              </WhiteTransparent>
            </MainContainer>
          )}
        </Box>

        <CruiseShortAbout />

        <CruiseBody />
      </VStack>
    </>
  );
};

Post.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Post;

export const getServerSideProps = (async (context) => {
  const postId = parseInt(context.params?.id as string);

  if (!isNaN(postId)) {
    const post = await prisma.blog.findUnique({
      where: {
        id: postId,
      },
    });

    return { props: { post } };
  }

  return { props: { post: null } };
}) satisfies GetServerSideProps<PostProps>;
