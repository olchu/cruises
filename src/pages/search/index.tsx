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

export type CruiseDetailsPageProps = {
  cruise: CruiseType | null;
};

const SearchPage = () => {
  const router = useRouter();
  console.log('router', router.query);
  return <div>hello</div>;
};

SearchPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default SearchPage;

// export const getServerSideProps = (async (context) => {
//   const cruiseId = parseInt(context.params?.cruiseId as string);

//   if (!isNaN(cruiseId)) {
//     const cruiseSelect = await prisma.cruises.findUnique({
//       where: {
//         id: cruiseId,
//       },
//     });
//     const cruise = JSON.parse(JSON.stringify(cruiseSelect));
//     return { props: { cruise: cruise } };
//   }

//   return { props: { cruise: null } };
// }) satisfies GetServerSideProps<{
//   cruise: CruiseType | null;
// }>;
