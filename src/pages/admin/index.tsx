import { AddPostForm } from '@/features/admin/addPost';
import { Ships } from '@/features/admin/vodohod/ui';
import AdminLayout from '@/layouts/admin';
import {
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  HStack,
} from '@chakra-ui/react';
import { ReactElement } from 'react';

const Dashboard = () => {
  return (
    <Tabs variant="soft-rounded">
      <TabList>
        <Tab>Блог</Tab>
        <Tab>Новости</Tab>
        <Tab>Страница</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <AddPostForm />
        </TabPanel>

        <TabPanel>Новости</TabPanel>

        <TabPanel>типы кают</TabPanel>
      </TabPanels>
    </Tabs>
  );
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Dashboard;
