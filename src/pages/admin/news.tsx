import { AddNewsForm } from '@/features/admin/addNews';
import { AddPostForm } from '@/features/admin/addPost';
import AdminLayout from '@/layouts/admin';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { ReactElement } from 'react';

const News = () => {
  return (
    <AddNewsForm />
  );
};

News.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default News;
