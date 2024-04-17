import { CruiseType, PagesPrismaType } from '@/shared/types/prismaResponse';
import { ReactElement, useCallback, useEffect, useMemo, useState } from 'react';
import { MainLayout } from '@/layouts/main';
import { GetServerSideProps } from 'next';
import { MainContainer } from '@/shared/ui/mainContainer/MainContainer';
import prisma from 'prisma/client';
import Head from 'next/head';
import { defaultItemsOnPage } from '@/shared/constants/constants';
import { SearchResultContent } from '@/features/searchResultContent';
import {
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { MainImage } from '@/entities/pagesComponents/mainImage/MainImage';
import {
  CompilationQueryType,
  getCompilation,
} from '@/shared/lib/utils/getCompilation';

export type CompilationPageProps = {
  compilation: PagesPrismaType;
  initialCruises: CruiseType[];
  totalCount: number;
};

const countLoadMore = defaultItemsOnPage;

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
  const queries = compilation?.query as string[];

  const content = useMemo(() => {
    const content = compilation?.content || '';
    return content.split('[[compilation]]');
  }, [compilation?.content]);

  const getCruises = useCallback(async () => {
    if (!queries) {
      setIsLoading(false);
      return;
    }
    setIsFetching(true);

    const response = await fetch(
      `/api/getCompilation?limit=${countLoadMore}&skip=${skip}`,
      {
        method: 'POST',
        body: JSON.stringify(queries),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const { cruises: cruisesRes, totalCount } = await response.json();

    setCruises([...cruises, ...(cruisesRes || [])]);
    setSkip((prev) => prev + countLoadMore);

    setIsLoading(false);
    setIsFetching(false);
  }, [queries, cruises, skip]);

  useEffect(() => {
    setCruises(initialCruises);
  }, [initialCruises]);

  const cruisesCount = useMemo(() => {
    return totalCount;
  }, [totalCount]);

  const handleGetMore = () => {
    getCruises();
  };

  return (
    <>
      <Head>
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
        {compilation?.title && (
          <Text as="h1" fontSize="28px" fontWeight="bold" w="full" mb="18px">
            {compilation?.title}
          </Text>
        )}
        <Box w="full" h="full" display={{ base: 'none', lg: 'block' }}>
          <Box
            className="compilationContainer"
            dangerouslySetInnerHTML={{
              __html: content[0] || '',
            }}
            mb="20px"
          />
          {queries.length > 0 && (
            <SearchResultContent
              handleGetMore={handleGetMore}
              isLoading={isLoading}
              isFetching={isFetching}
              cruises={cruises}
              cruisesCount={cruisesCount}
              itemsOnPage={countLoadMore}
            />
          )}
          <Box
            mt="20px"
            className="compilationContainer"
            dangerouslySetInnerHTML={{
              __html: content[1] || '',
            }}
          />
        </Box>

        <Tabs display={{ base: 'block', lg: 'none' }}>
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
                  itemsOnPage={countLoadMore}
                />
              )}
            </TabPanel>
            {content[0] && (
              <TabPanel>
                <Box
                  className="compilationContainer"
                  dangerouslySetInnerHTML={{
                    __html: content.join('') || '',
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

    const query = compilation.query as CompilationQueryType[];

    if (compilation.query) {
      const { cruises, totalCount: count } = await getCompilation({
        query,
        itemsOnPage: compilation.itemsOnPage || defaultItemsOnPage,
      });

      initialCruises = [...cruises];
      totalCount = count;
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
