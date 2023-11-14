import AdminLayout from '@/layouts/admin';
import { ReactElement } from 'react';

const Dashboard = () => {
  return <div>about</div>;
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Dashboard;
