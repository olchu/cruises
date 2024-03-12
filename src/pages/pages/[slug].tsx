import { CruiseType, PagesPrismaType } from '@/shared/types/prismaResponse';
import { ReactElement, useCallback, useEffect, useMemo, useState } from 'react';
import { MainLayout } from '@/layouts/main';
import { GetServerSideProps, GetStaticProps } from 'next';
import { MainContainer } from '@/shared/ui/mainContainer/MainContainer';
import prisma from 'prisma/client';
import Head from 'next/head';
import { getShips } from '@/shared/api/getShips';
import { itemsOnPage } from '@/shared/constants/constants';
import { SearchResultContent } from '@/features/searchResultContent';

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
  const [cruises, setCruises] = useState<CruiseType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [skip, setSkip] = useState(0);
  const [cruisesCount, setCruisesCount] = useState(0);
  const metaTags = compilation.metaTag as TagType[];

  const getCruises = useCallback(async () => {
    if (!compilation.query) {
      setIsLoading(false);
      return;
    }
    setIsFetching(true);

    const response = await fetch(
      `/api/searchCruises?limit=${itemsOnPage}&skip=${skip}` + compilation.query
    );
    const { cruises: cruisesRes, totalCount } = await response.json();

    setCruisesCount(totalCount);

    setCruises([...cruises, ...cruisesRes]);
    setSkip((prev) => prev + itemsOnPage);

    setIsLoading(false);
    setIsFetching(false);
  }, [compilation.query, cruises, skip]);

  const handleGetMore = () => {
    getCruises();
  };

  useEffect(() => {
    getCruises();
  }, []);

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

        {compilation.query && (
          <SearchResultContent
            handleGetMore={handleGetMore}
            isLoading={isLoading}
            isFetching={isFetching}
            cruises={cruises}
            cruisesCount={cruisesCount}
          />
        )}
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
