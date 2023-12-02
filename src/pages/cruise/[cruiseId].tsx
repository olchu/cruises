import { MainLayout } from '@/layouts/main';
import { CruiseType } from '@/shared/types/prismaResponse';
import { MainContainer } from '@/shared/ui/mainContainer/MainContainer';
import { Box, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import prisma from 'prisma/client';
import { ReactElement } from 'react';

interface CruiseDetailsPageProps {
  cruise: CruiseType | null;
}

const CtuiseDetails = ({ cruise }: CruiseDetailsPageProps) => {
  const route = cruise?.route || [];

  console.log('cruise', cruise);
  return (
    <VStack w="full" gap={0}>
      <Box
        w="full"
        h="200px"
        bgImage={cruise?.image}
        bgPosition="center"
        bgSize="cover"
      ></Box>
      <MainContainer bg="green">
        <HStack as="header" w="full" h="50px" bg="lightBlue">
          <Text flex="1" textAlign="center">
            Маршрут и экскурсии
          </Text>
          <Text flex="1" textAlign="center">
            Цены
          </Text>
          <Text flex="1" textAlign="center">
            Описание
          </Text>
          <Text flex="1" textAlign="center">
            Теплоход
          </Text>
        </HStack>
        <Box>
          <Heading>Что включено в стоимость</Heading>
          <Text>В стоимость тура входит</Text>

          <div
            dangerouslySetInnerHTML={{ __html: cruise?.included || '' }}
          ></div>
          <Text>В стоимость тура не входит</Text>
          <div
            dangerouslySetInnerHTML={{ __html: cruise?.excluded || '' }}
          ></div>
        </Box>
      </MainContainer>
    </VStack>
  );
};

CtuiseDetails.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default CtuiseDetails;

export const getServerSideProps = (async (context) => {
  const cruiseId = parseInt(context.params?.cruiseId as string);

  if (!isNaN(cruiseId)) {
    const cruiseSelect = await prisma.cruises.findUnique({
      where: {
        id: cruiseId,
      },
    });
    const cruise = JSON.parse(JSON.stringify(cruiseSelect));
    return { props: { cruise: cruise } };
  }

  return { props: { cruise: null } };
}) satisfies GetServerSideProps<{
  cruise: CruiseType | null;
}>;
