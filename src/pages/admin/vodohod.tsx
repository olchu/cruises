import AdminLayout from '@/layouts/admin';
import { Cruises, Ships } from '@/features/vodohod/ui';
import { DBShipsData } from '@/features/vodohod/ui/ships/utils/prepareShips';
import { Providers } from '@/constants/providers';
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

export interface ShipsDataType extends DBShipsData {
  id: number;
}

const Vodohod = ({
  data,
}: {
  data: {
    ships: ShipsDataType[];
  };
}) => {
  return (
    <>
      <Heading mb={8}>ВОДОХОД api</Heading>
      <Tabs variant="soft-rounded">
        <TabList>
          <Tab>Теплоходы</Tab>
          <Tab>Круизы</Tab>
          <Tab>Справочники</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Ships />
          </TabPanel>
          <TabPanel>
            <Cruises ships={data.ships} />
          </TabPanel>
          <TabPanel>типы кают</TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

Vodohod.layout = AdminLayout;
export default Vodohod;

export const getStaticProps: GetStaticProps<{
  data: any;
}> = async () => {
  const shipsSelect = await prisma.ships.findMany({
    where: {
      loadFrom: Providers.vodohod,
    },
  });

  const ships = JSON.parse(JSON.stringify(shipsSelect));

  return {
    props: { data: { ships: ships || [] } },
  };
};
