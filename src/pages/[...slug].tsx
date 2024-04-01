import {
  CruiseType,
  PagesPrismaType,
  TagPrismaType,
} from '@/shared/types/prismaResponse';
import { ReactElement, useCallback, useEffect, useState } from 'react';
import { MainLayout } from '@/layouts/main';
import { GetServerSideProps, GetStaticProps } from 'next';
import { MainContainer } from '@/shared/ui/mainContainer/MainContainer';
import prisma from 'prisma/client';
import Head from 'next/head';
import { defaultItemsOnPage } from '@/shared/constants/constants';
import { SearchResultContent } from '@/features/searchResultContent';
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { MainImage } from '@/entities/pagesComponents/mainImage/MainImage';

export type CompilationPageProps = {
  compilation: PagesPrismaType;
};

const CompilationPage = ({ compilation }: CompilationPageProps) => {
  const [cruises, setCruises] = useState<CruiseType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [skip, setSkip] = useState(0);
  const [cruisesCount, setCruisesCount] = useState(0);
  const metaTags = compilation?.metaTag as TagPrismaType[];
  const queries = compilation?.query as string[];
  const itemsOnPage = compilation?.itemsOnPage || defaultItemsOnPage;
  console.log('compilation?.itemsOnPage', compilation?.itemsOnPage);

  const getCruises = useCallback(async () => {
    if (!queries) {
      setIsLoading(false);
      return;
    }
    setIsFetching(true);

    const response = await fetch(
      `/api/getCompilation?limit=${itemsOnPage}&skip=${skip}`,
      {
        method: 'POST',
        body: JSON.stringify(queries),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const { cruises: cruisesRes, totalCount } = await response.json();

    setCruisesCount(totalCount);

    setCruises([...cruises, ...(cruisesRes || [])]);
    setSkip((prev) => prev + itemsOnPage);

    setIsLoading(false);
    setIsFetching(false);
  }, [queries, cruises, skip]);

  const handleGetMore = () => {
    getCruises();
  };

  useEffect(() => {
    getCruises();
  }, []);

  return (
    <>
      <Head>
        {/* {metaTags?.map(({ key, content }, index) => {
          const props = { [key.name]: key.val, content };
          return <meta key={index} {...props} />;
        })} */}
        <title>{compilation?.seoTitle}</title>

        {compilation.seoKeywords && (
          <meta name="keywords" content={compilation.seoKeywords} />
        )}
        {compilation.seoDescription && (
          <meta name="description" content={compilation.seoDescription} />
        )}

        {compilation?.seoCanonicalUrl && (
          <link rel="canonical" href={compilation?.seoCanonicalUrl} />
        )}

        <link rel="icon" href="/favicon.ico" />
      </Head>
      {compilation?.images && (
        <MainImage
          title={compilation?.title || ''}
          image={compilation?.images}
        />
      )}
      <MainContainer
        as="section"
        overflow="hidden"
        px={{ base: 'section.mobile', lg: 'section.desktop' }}
        py={{ base: 'section.mobile', lg: 'section.desktop' }}
        maxW={'1400px'}
        h="full"
      >
        <Tabs>
          <TabList mb="12px">
            <Tab fontSize="18px" fontWeight="bold" color="primary">
              Круизы
            </Tab>
            {compilation?.content && (
              <Tab fontSize="18px" fontWeight="bold" color="primary">
                Описание
              </Tab>
            )}
          </TabList>

          <TabPanels>
            <TabPanel p="0">
              {compilation?.query && (
                <SearchResultContent
                  handleGetMore={handleGetMore}
                  isLoading={isLoading}
                  isFetching={isFetching}
                  cruises={cruises}
                  cruisesCount={cruisesCount}
                  itemsOnPage={itemsOnPage}
                />
              )}
            </TabPanel>
            {compilation?.content && (
              <TabPanel>
                <Box
                  dangerouslySetInnerHTML={{
                    __html: compilation?.content || '',
                  }}
                />
              </TabPanel>
            )}
          </TabPanels>
        </Tabs>
      </MainContainer>
    </>
  );
};

CompilationPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default CompilationPage;

// export async function getStaticPaths() {
//   const pages = await prisma.pages.findMany({
//     select: {
//       slug: true,
//     },
//   });

//   const paths = pages.map((page) => {
//     return {
//       params: { slug: page.slug.split('/') },
//     };
//   });

//   return { paths, fallback: true };
// }

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  if (!params) {
    return {
      notFound: true,
    };
  }

  try {
    const paramsSlug = params?.slug as string[];
    const slug = paramsSlug.join('/');

    const compilation = await prisma.pages.findUnique({
      where: {
        slug: slug,
      },
    });

    if (compilation === null || compilation.active === 0) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        compilation,
      },
    };
  } catch (error) {
    console.error('Error loading server side props', error);
    return {
      notFound: true,
    };
  }
};
