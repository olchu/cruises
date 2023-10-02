import MainLayout from '@/layouts/main';
import Link from 'next/link';
import { ReactElement } from 'react';

const Custom404 = () => {
  return (
    <div>
      <h1>404 - Страница не найдена</h1>
      <p>Страница, которую вы запрашивате, не существует</p>
      <Link href="/">вернуться</Link>
    </div>
  );
};
Custom404.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Custom404;
