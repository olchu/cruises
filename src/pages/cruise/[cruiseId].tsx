import MainLayout from '@/layouts/main';
import { CruiseType } from '@/shared/types/prismaResponse';
import { GetServerSideProps } from 'next';
import prisma from 'prisma/client';

interface CruiseDetailsPageProps {
  cruise: CruiseType | null;
}

export const CtuiseDetails = ({ cruise }: CruiseDetailsPageProps) => {
  console.log('cruise', cruise);
  return <>{cruise?.title}</>;
};

CtuiseDetails.layout = MainLayout;
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
