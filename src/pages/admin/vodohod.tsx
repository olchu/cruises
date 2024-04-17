import AdminLayout from '@/layouts/admin';
import { Cruises, Ships } from '@/features/admin/vodohod/ui';
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
import { createContext, ReactElement } from 'react';
import { ShipsType } from '@/shared/types/prismaResponse';

export const ShipsContext = createContext<ShipsType[]>([]);

const Vodohod = ({
  data,
}: {
  data: {
    ships: ShipsType[];
  };
}) => {
  return (
    <ShipsContext.Provider value={data.ships}>
      <Heading mb={8}>ВОДОХОД api</Heading>
      <Tabs variant="soft-rounded">
        <TabList>
          <Tab>Круизы</Tab>
          <Tab>Теплоходы</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Cruises ships={data.ships} />
          </TabPanel>
          <TabPanel>
            <Ships />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </ShipsContext.Provider>
  );
};

Vodohod.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Vodohod;

export const getStaticProps: GetStaticProps<{
  data: {
    ships: ShipsType[];
  };
}> = async () => {
  const shipsSelect = await prisma.ships.findMany({
    where: {
      loadFrom: Providers.vodohod,
    },
  });

  const ships = JSON.parse(JSON.stringify(shipsSelect));

  return {
    props: { data: { ships: shipsSelect || [] } },
  };
};
