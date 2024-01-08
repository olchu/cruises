import { CruiseType } from '@/shared/types/prismaResponse';
import { ReactElement } from 'react';
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

export type SearchPageProps = {
  cruises: CruiseType[] | null;
};

const SearchPage = ({ cruises }: SearchPageProps) => {
  const router = useRouter();
  console.log('router', router.query);
  console.log('cruises', cruises);
  return (
    <MainContainer
      as="section"
      overflow="hidden"
      px={{ base: 'section.mobile', lg: 'section.desktop' }}
      py={{ base: 'section.mobile', lg: 'section.desktop' }}
      maxW={'1400px'}
      h="full"
    >
      <Heading as="h1" size="lg" mb={{ base: '12px', lg: '18px' }}>
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
          w="300px"
          bg="white"
          h="full"
          alignItems="flex-start"
          p={{ base: '12px', lg: '18px' }}
          shadow="md"
        >
          <Text>Hello</Text>
        </VStack>
        <VStack
          w="full"
          h="full"
          alignItems="flex-start"
          p={{ base: '12px', lg: '18px' }}
        >
          {cruises?.length === 0 ? (
            <VStack w="full">
              <Text fontSize="80px" color="primary" opacity={0.2}>
                <TbShipOff />
              </Text>
              <Text
                fontWeight="600"
                fontSize="30px"
                textAlign="center"
                opacity={0.2}
                color="primary"
              >
                Мы не нашли круизы по Вашему запросу.
                <br />
                Попробуйте изменить параметры поиска
              </Text>
            </VStack>
          ) : (
            <Text>Найдено {cruises?.length} круизов</Text>
          )}
          {cruises?.map((cruise) => {
            return <div key={cruise.id}>{cruise.title}</div>;
          })}
        </VStack>
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
