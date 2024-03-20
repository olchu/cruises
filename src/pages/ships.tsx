import { ShipsList } from '@/entities/shipsList';
import { MainLayout } from '@/layouts/main';
import { MainContainer } from '@/shared/ui/mainContainer/MainContainer';
import { ReactElement } from 'react';
import shipsData from '../../public/ships.json';

const ShipsListPage = () => {
  // console.log('ships', shipsData);
  return (
    <MainContainer
      px={{ base: 'section.mobile', lg: 'section.desktop' }}
      py={{ base: 'section.mobile', lg: 'section.desktop' }}
    >
      <ShipsList ships={shipsData} />
    </MainContainer>
  );
};

ShipsListPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default ShipsListPage;

// export const getServerSideProps: GetServerSideProps<
//   ShipListProps
// > = async () => {
//   const ships = await getShipsList();

//   return { props: { ships } };
// };
