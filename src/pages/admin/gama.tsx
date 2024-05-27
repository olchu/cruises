import AdminLayout from '@/layouts/admin';
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
import { Cruises } from '@/features/admin/gama/ui';

export const ShipsContext = createContext<ShipsType[]>([]);

const Gama = ({
  data,
}: {
  data: {
    ships: ShipsType[];
  };
}) => {
  console.log('ships', data.ships);
  return (
    <ShipsContext.Provider value={data.ships}>
      <Heading mb={8}>Гама api</Heading>
      <Tabs variant="soft-rounded">
        <TabList>
          <Tab>Круизы</Tab>
          {/* <Tab>Теплоходы</Tab> */}
        </TabList>

        <TabPanels>
          <TabPanel>
            <Cruises ships={data.ships} />{' '}
          </TabPanel>
          {/* <TabPanel>
            <Ships />
          </TabPanel> */}
        </TabPanels>
      </Tabs>
    </ShipsContext.Provider>
  );
};

Gama.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Gama;

export const getStaticProps: GetStaticProps<{
  data: {
    ships: ShipsType[];
  };
}> = async () => {
  const shipsSelect = await prisma.ships.findMany({
    where: {
      loadFrom: Providers.gama,
    },
  });

  const ships = JSON.parse(JSON.stringify(shipsSelect));

  return {
    props: { data: { ships: shipsSelect || [] } },
  };
};
