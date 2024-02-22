import { CruiseShortAbout } from '@/entities/cruiseDetails';
import { CruiseBody } from '@/entities/cruiseDetails/ui/cruiseBody/CruiseBody';
import { MainLayout } from '@/layouts/main';
import { CruiseType } from '@/shared/types/prismaResponse';
import { MainContainer } from '@/shared/ui/mainContainer/MainContainer';
import { WhiteTransparent } from '@/shared/ui/whiteTransparent/WhiteTransparent';
import { Box, Text, VStack } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import prisma from 'prisma/client';
import { ReactElement } from 'react';

export type CruiseDetailsPageProps = {
  cruise: CruiseType | null;
};

const CtuiseDetails = ({ cruise }: CruiseDetailsPageProps) => {
  const route = cruise?.route || [];

  console.log('cruise', cruise);
  return (
    <VStack w="full" gap={0} alignItems="center">
      <Box
        w="full"
        h="200px"
        bgImage={cruise?.image}
        bgPosition="center"
        bgSize="cover"
      >
        {cruise?.title && (
          <MainContainer mt={{ base: 'section.mobile', md: 'section.desktop' }}>
            <WhiteTransparent
              width={{ base: 'full', md: 'fit-content' }}
              p="12px"
            >
              <Text
                fontSize={{ base: '22px', lg: '28px' }}
                fontWeight="bold"
                whiteSpace="pre-wrap"
                color="white"
                px="30px"
              >
                {cruise?.title}
              </Text>
            </WhiteTransparent>
          </MainContainer>
        )}
      </Box>

      <CruiseShortAbout cruise={cruise} />

      <CruiseBody cruise={cruise} />
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
