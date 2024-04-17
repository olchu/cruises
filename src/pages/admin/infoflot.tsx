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
import { ReactElement } from 'react';
import { Ships } from '@/features/admin/infoflot/ui/ships/Ships';
import { Cruises } from '@/features/admin/infoflot/ui/cruises/Cruises';
import React from 'react';
import { ShipsType } from '@/shared/types/prismaResponse';

const ThemeContext = React.createContext({});

const Infoflot = ({
  data,
}: {
  data: {
    ships: ShipsType[];
  };
}) => {
  console.log('infoflot ships', data.ships);
  return (
    <ThemeContext.Provider value={{ ships: data.ships }}>
      <Heading mb={8}>Infoflot api</Heading>
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
    </ThemeContext.Provider>
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

  // const ships = JSON.parse(JSON.stringify(shipsSelect));
  const ships = shipsSelect;

  return {
    props: { data: { ships: ships || [] } },
  };
};
