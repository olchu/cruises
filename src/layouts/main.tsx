import { LayoutProps } from '@/shared/types/pageWithLayouts';

const MainLayout: LayoutProps = ({ children }) => {
  return (
    <>
      <header>Тут будет меню</header>
      <main>{children}</main>
    </>
  );
};
export default MainLayout;
