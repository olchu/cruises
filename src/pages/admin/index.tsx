import AdminLayout from '@/layouts/admin';
import { Box } from '@chakra-ui/react';
import { ReactElement } from 'react';

const Dashboard = () => {
  return <Box>Админка</Box>;
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Dashboard;
