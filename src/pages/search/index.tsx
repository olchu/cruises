import { CruiseType } from '@/shared/types/prismaResponse';
import { ReactElement, useEffect } from 'react';
import { MainLayout } from '@/layouts/main';
import {
  HStack,
  Heading,
  Box,
  Link,
  Text,
  Stack,
  VStack,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import prisma from 'prisma/client';
import { GetServerSideProps } from 'next';
import { MainContainer } from '@/shared/ui/mainContainer/MainContainer';
import { TbShipOff } from 'react-icons/tb';
import { Search } from '@/features/search';
import { NoCruiseFound } from '@/entities/noCruiseFound';
import { CruisesFounded } from '@/widgets/cruisesFounded/ui/CruisesFounded';

export type SearchPageProps = {
  cruises: CruiseType[] | null;
};

const SearchPage = ({ cruises }: SearchPageProps) => {
  const router = useRouter();
  console.log('cruises', cruises);
  useEffect(() => {
    console.log('query', router.query);
  }, [router.query]);
  return (
    <MainContainer
      as="section"
      overflow="hidden"
      px={{ base: 'section.mobile', lg: 'section.desktop' }}
      py={{ base: 'section.mobile', lg: 'section.desktop' }}
      maxW={'1400px'}
      h="full"
    >
      <Heading
        as="h1"
        size="lg"
        mb={{ base: '12px', lg: '18px' }}
        color="primary"
      >
        Поиск Круизов
      </Heading>
      <Stack
        justifyContent="flex-start"
        w="full"
        flex={1}
        gap={{ base: 'section.mobile', lg: 'section.desktop' }}
        direction={{ base: 'column', md: 'row' }}
      >
        <VStack
          w="350px"
          bg="white"
          h="full"
          alignItems="flex-start"
          p={{ base: '12px', lg: '18px' }}
          shadow="md"
          gap="18px"
        >
          <Search />
        </VStack>
        <CruisesFounded cruises={cruises} />
      </Stack>
    </MainContainer>
  );
};

SearchPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default SearchPage;

export const getServerSideProps = (async (context) => {
  const query = context.query;
  const cruiseSelect = await prisma.cruises.findMany({
    where: {
      cityStart: query.cityFrom as string,
      cityEnd: query.cityEnd as string,
      shipId: parseInt(query.ship as string) || undefined,
    },
  });
  const cruises = JSON.parse(JSON.stringify(cruiseSelect));
  return { props: { cruises: cruises } };
}) satisfies GetServerSideProps<{
  cruises: CruiseType[] | null;
}>;
