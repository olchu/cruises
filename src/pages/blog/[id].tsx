import { MainLayout } from '@/layouts/main';
import { PostsType } from '@/shared/types/prismaResponse';
import { MainContainer } from '@/shared/ui/mainContainer/MainContainer';
import { Box, Text } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import prisma from 'prisma/client';
import { ReactElement } from 'react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { PostimagesGallery } from '@/features/postimagesGallery';

export type PostDetailsPageProps = {
  post: PostsType;
};

const PostDetails = ({ post }: PostDetailsPageProps) => {
  const formatedDate = format(post?.date!, 'dd MMMM yyyy', {
    locale: ru,
  });

  const images: string[] = JSON.parse(post?.images || '[]');

  return (
    <>
      <Head>
        <title>{post?.title + ' ' + formatedDate}</title>

        {post?.preview && <meta name="description" content={post?.preview} />}

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
        {post?.title && (
          <Text
            as="h1"
            fontSize={{ base: '22px', lg: '28px' }}
            fontWeight="bold"
            whiteSpace="pre-wrap"
            mb="20px"
          >
            {post?.title}
          </Text>
        )}

        <PostimagesGallery images={images} />
        <Box
          mt="30px"
          whiteSpace="pre-wrap"
          className="compilationContainer"
          dangerouslySetInnerHTML={{
            __html: post?.content || '',
          }}
        />
      </MainContainer>
    </>
  );
};

PostDetails.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default PostDetails;

export const getServerSideProps = (async (context) => {
  const postId = parseInt(context.params?.id as string);

  console.log('postId = ', postId);

  if (isNaN(postId))
    return {
      notFound: true,
    };

  const postSelect = await prisma.blog.findUnique({
    where: {
      id: postId,
    },
  });
  const post = JSON.parse(JSON.stringify(postSelect));

  return { props: { post: post } };
}) satisfies GetServerSideProps<PostDetailsPageProps>;
