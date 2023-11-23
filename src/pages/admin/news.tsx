import { AddNewsForm } from '@/features/admin/addNews';
import { AddPostForm } from '@/features/admin/addPost';
import AdminLayout from '@/layouts/admin';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { ReactElement } from 'react';

const News = () => {
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

        <TabPanel>
          <AddNewsForm />
        </TabPanel>

        <TabPanel>типы кают</TabPanel>
      </TabPanels>
    </Tabs>
  );
};

News.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default News;
