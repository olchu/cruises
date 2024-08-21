import { AddNewsForm } from '@/features/admin/addNews';
import AdminLayout from '@/layouts/admin';
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
