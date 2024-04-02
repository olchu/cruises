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
import axios from 'axios';

export type CompilationPageProps = {
  compilation: PagesPrismaType;
  initialCruises: CruiseType[];
  totalCount: number;
};

const CompilationPage = ({
  compilation,
  initialCruises,
  totalCount,
}: CompilationPageProps) => {
  const [cruises, setCruises] = useState<CruiseType[]>(initialCruises);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [skip, setSkip] = useState(
    compilation.itemsOnPage || defaultItemsOnPage
  );
  const [cruisesCount, setCruisesCount] = useState(totalCount);
  const metaTags = compilation?.metaTag as TagPrismaType[];
  const queries = compilation?.query as string[];
  const itemsOnPage = compilation?.itemsOnPage || defaultItemsOnPage;

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

type Query = Record<string, any[] | string>;

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
    let initialCruises: CruiseType[] = [];
    let totalCount = 0;

    const query = compilation.query as Query[];

    if (compilation.query) {
      const options = query.map((query: Query) => {
        const objQuery: Record<
          string,
          {
            in?: any[];
            contains?: string;
          }
        > = {};
        for (const key in query) {
          const optionKey = [
            'cityStart',
            'cityEnd',
            'type',
            'class',
            'provider',
          ].includes(key)
            ? 'contains'
            : 'in';
          objQuery[key] = {
            [optionKey]: query[key],
          };
        }
        return objQuery;
      });

      const where = {
        OR: options,
      };

      const cruiseSelect = await prisma.cruises.findMany({
        where: where,
        orderBy: {
          dateStart: 'asc',
        },
        take: compilation.itemsOnPage || defaultItemsOnPage,
        skip: 0,
      });
      const cruises = await JSON.parse(JSON.stringify(cruiseSelect));
      initialCruises = [...cruises];

      const totalCountres = await prisma.cruises.count({
        where: where,
      });
      totalCount = await JSON.parse(JSON.stringify(totalCountres));
    }

    return {
      props: {
        compilation,
        initialCruises,
        totalCount,
      },
    };
  } catch (error) {
    console.error('Error loading server side props', error);
    return {
      notFound: true,
    };
  }
};
