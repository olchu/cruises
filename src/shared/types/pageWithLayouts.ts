import AdminLayout from '@/layouts/admin';
import { MainLayout } from '@/layouts/main';
import { NextPage } from 'next';
import { ReactElement } from 'react';

export type PageWithMainLayoutType = NextPage & { layout: typeof MainLayout };
export type PageWithAdminLayoutType = NextPage & { layout: typeof AdminLayout };
export type PageWithLayoutType =
  | PageWithMainLayoutType
  | PageWithAdminLayoutType;
export type LayoutProps = ({
  children,
  isMobileDevice,
}: {
  children: ReactElement;
  isMobileDevice?: boolean;
}) => ReactElement;
export default PageWithLayoutType;
