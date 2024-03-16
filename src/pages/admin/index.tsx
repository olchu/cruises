import { AddNewsForm } from '@/features/admin/addNews';
import { AddPostForm } from '@/features/admin/addPost';
import AdminLayout from '@/layouts/admin';
import { Tab, TabList, TabPanel, TabPanels, Tabs, Box } from '@chakra-ui/react';
import { ReactElement } from 'react';

const Dashboard = () => {
  return <Box>Админка</Box>;
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Dashboard;
