import AdminLayout from '@/components/layouts/admin';
import { Cruises, Ships } from '@/components/vodohod/ui';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';

const Vodohod = () => {
  return (
    <Tabs variant="soft-rounded">
      <TabList>
        <Tab>Теплоходы</Tab>
        <Tab>Круизы</Tab>
        <Tab>Типы кают</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <Ships />
        </TabPanel>
        <TabPanel>
          <Cruises />
        </TabPanel>
        <TabPanel>типы кают</TabPanel>
      </TabPanels>
    </Tabs>
  );
};

Vodohod.layout = AdminLayout;
export default Vodohod;
