import { PagesPrismaType } from '@/shared/types/prismaResponse';
import { ReactElement, useMemo } from 'react';
import { MainLayout } from '@/layouts/main';
import { GetStaticProps } from 'next';
import { MainContainer } from '@/shared/ui/mainContainer/MainContainer';
import prisma from 'prisma/client';
import Head from 'next/head';

export type CompilationPageProps = {
  compilation: PagesPrismaType;
};

type TagType = {
  key: {
    name: string;
    val: string;
  };
  content: string;
};

const CompilationPage = ({ compilation }: CompilationPageProps) => {
  const metaTags = compilation.metaTag as TagType[];
  return (
    <>
      <Head>
        <title>{compilation?.title}</title>
        {metaTags.map(({ key, content }, index) => {
          const props = { [key.name]: key.val, content };
          return <meta key={index} {...props} />;
        })}

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainContainer
        as="section"
        overflow="hidden"
        px={{ base: 'section.mobile', lg: 'section.desktop' }}
        py={{ base: 'section.mobile', lg: 'section.desktop' }}
        maxW={'1400px'}
        h="full"
      >
        {compilation?.title}
      </MainContainer>
    </>
  );
};

CompilationPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default CompilationPage;

export async function getStaticPaths() {
  const pages = await prisma.pages.findMany({
    select: {
      slug: true,
    },
  });

  const paths = pages.map((page) => ({
    params: { slug: page.slug },
  }));

  return { paths, fallback: false };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params || typeof params.slug !== 'string') {
    return {
      notFound: true,
    };
  }

  try {
    const slug = params?.slug as string;

    const compilation = await prisma.pages.findUnique({
      where: {
        slug: slug,
      },
    });

    return {
      props: {
        compilation,
      },
    };
  } catch (error) {
    console.error('Error loading static props', error);
    return {
      notFound: true,
    };
  }
};
