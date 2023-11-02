import { ThemeProvider } from '@/app/providers/themeProvider';
import { Footer } from '@/features/footer';
import { TopMenu } from '@/features/topMenu';
import { LayoutProps } from '@/shared/types/pageWithLayouts';
import { Spacer, VStack } from '@chakra-ui/react';

const MainLayout: LayoutProps = ({ children }) => {
  return (
    <ThemeProvider>
      <TopMenu />
      <VStack as="main">{children}</VStack>
      <Spacer />
      <Footer />
    </ThemeProvider>
  );
};
export default MainLayout;
