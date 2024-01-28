import AdminLayout from '@/layouts/admin';
import { DBShipsData } from '@/features/admin/vodohod/ui/ships/utils/prepareShips';
import { Providers } from '@/shared/constants/providers';
import {
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import { GetStaticProps } from 'next';
import prisma from 'prisma/client';
import { ReactElement } from 'react';
import { Ships } from '@/features/admin/infoflot/ui/ships/Ships';

export interface ShipsDataType extends DBShipsData {
  id: number;
}

const Infoflot = ({
  data,
}: {
  data: {
    ships: ShipsDataType[];
  };
}) => {
  return (
    <>
      <Heading mb={8}>Infoflot api</Heading>
      <Tabs variant="soft-rounded">
        <TabList>
          <Tab>Теплоходы</Tab>
          <Tab>Круизы</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Ships />
          </TabPanel>
          <TabPanel>
            {/* <Cruises ships={data.ships} /> */}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

Infoflot.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Infoflot;

export const getStaticProps: GetStaticProps<{
  data: any;
}> = async () => {
  const shipsSelect = await prisma.ships.findMany({
    where: {
      loadFrom: Providers.infoflot,
    },
  });

  const ships = JSON.parse(JSON.stringify(shipsSelect));

  return {
    props: { data: { ships: ships || [] } },
  };
};
