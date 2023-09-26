import AdminLayout from '@/components/layouts/admin';
import MainLayout from '@/components/layouts/main';
import { NextPage } from 'next';
import { ReactElement } from 'react';

export type PageWithMainLayoutType = NextPage & { layout: typeof MainLayout };
export type PageWithAdminLayoutType = NextPage & { layout: typeof AdminLayout };
export type PageWithLayoutType =
  | PageWithMainLayoutType
  | PageWithAdminLayoutType;
export type LayoutProps = ({
  children,
}: {
  children: ReactElement;
}) => ReactElement;
export default PageWithLayoutType;
