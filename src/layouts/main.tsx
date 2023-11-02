import { ThemeProvider } from '@/app/providers/themeProvider';
import { TopMenu } from '@/features/topMenu';
import { LayoutProps } from '@/shared/types/pageWithLayouts';
import { Spacer, VStack } from '@chakra-ui/react';
import dynamic from 'next/dynamic';

// const NoSSRTopMenu = dynamic(() => import('../features/topMenu'), {
//   ssr: false,
// });

const MainLayout: LayoutProps = ({ children }) => {
  return (
    <ThemeProvider>
      <TopMenu/>
      {/* <NoSSRTopMenu /> */}
      <VStack as="main">{children}</VStack>
      <Spacer />
      <div>Footer</div>
    </ThemeProvider>
  );
};
export default MainLayout;
