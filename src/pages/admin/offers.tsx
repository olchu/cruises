import AdminLayout from '@/layouts/admin';
import { Box, Heading, Text, VStack } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import prisma from 'prisma/client';
import { ReactElement } from 'react';

type OffersProps = {
  offers: string[];
  discounts: string[];
};

const Posts = ({ offers, discounts }: OffersProps) => {
  return (
    <Box>
      <Heading as="h1" size="2xl" mb="30px">
        Акции и скидки
      </Heading>

      <Text>Акции</Text>
      <VStack gap="12px" align="start">
        {offers.map((offer, index) => (
          <Text key={index}>{offer}</Text>
        ))}
      </VStack>

      <Text>Скидки</Text>
      <VStack gap="12px" align="start">
        {discounts.map((discount, index) => (
          <Text key={index}>{discount}</Text>
        ))}
      </VStack>
    </Box>
  );
};

export const getServerSideProps = (async ({ req }) => {
  const cruises = await prisma.cruises.findMany({
    select: {
      offers: true,
      discounts: true,
    },
  });

  const offersArray: string[] = cruises.flatMap(
    (cruise) => cruise.offers as string
  );
  const offersUnique = Array.from(new Set(offersArray));

  const discountArray: string[] = cruises.flatMap(
    (cruise) => cruise.discounts as string
  );
  const discountsUnique = Array.from(new Set(discountArray));

  return { props: { offers: offersUnique, discounts: discountsUnique } };
}) satisfies GetServerSideProps<OffersProps>;

Posts.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Posts;
