import {
  CruiseType,
  PagesPrismaType,
  TagPrismaType,
} from '@/shared/types/prismaResponse';
import { ReactElement, useCallback, useEffect, useState } from 'react';
import { MainLayout } from '@/layouts/main';
import { GetStaticProps } from 'next';
import { MainContainer } from '@/shared/ui/mainContainer/MainContainer';
import prisma from 'prisma/client';
import Head from 'next/head';
import { itemsOnPage } from '@/shared/constants/constants';
import { SearchResultContent } from '@/features/searchResultContent';
import Image from 'next/image';
import {
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';

export type CompilationPageProps = {
  compilation: PagesPrismaType;
};

const CompilationPage = ({ compilation }: CompilationPageProps) => {
  const [cruises, setCruises] = useState<CruiseType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [skip, setSkip] = useState(0);
  const [cruisesCount, setCruisesCount] = useState(0);
  const metaTags = compilation.metaTag as TagPrismaType[];
  const queries = compilation.query as string[];

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

    setCruises([...cruises, ...cruisesRes || []]);
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
        <title>{compilation?.title}</title>
        {metaTags?.map(({ key, content }, index) => {
          const props = { [key.name]: key.val, content };
          return <meta key={index} {...props} />;
        })}

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box
        w="full"
        h={{ base: '150px', lg: '250px' }}
        minH={{ base: '150px', lg: '250px' }}
        overflow="hidden"
        position="relative"
      >
        <Image
          src={compilation?.images || '/temp.jpg'}
          alt={compilation.title || ''}
          fill={true}
          style={{ objectFit: 'cover' }}
        />
        <Box
          as="span"
          position="absolute"
          px={{ base: 'section.mobile', lg: 'section.desktop' }}
          py={{ base: 'section.mobile', lg: 'section.desktop' }}
          bottom="0"
          left="0"
          bg="linear-gradient(0deg, rgba(0,0,0,0.8057598039215687) 40%, rgba(255,255,255,0) 100%)"
          w="full"
          h="45%"
        />
        {compilation.title && (
          <MainContainer as="div" maxW={'1400px'} position="relative" h="full">
            <Text
              position="absolute"
              px={{ base: 'section.mobile', lg: 'section.desktop' }}
              py={{ base: 'section.mobile', lg: 'section.desktop' }}
              bottom="0"
              left="0"
              color="white"
              fontSize="26px"
              fontWeight="bold"
              w="full"
            >
              {compilation.title}
            </Text>
          </MainContainer>
        )}
      </Box>
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
            {compilation?.content && <Tab fontSize="18px" fontWeight="bold" color="primary">Описание</Tab>}
          </TabList>

          <TabPanels>
            <TabPanel p="0">
              {compilation.query && (
                <SearchResultContent
                  handleGetMore={handleGetMore}
                  isLoading={isLoading}
                  isFetching={isFetching}
                  cruises={cruises}
                  cruisesCount={cruisesCount}
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
