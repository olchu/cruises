import { ThemeProvider } from '@/app/providers/themeProvider';
import { Footer } from '@/features/footer';
import { TopMenu } from '@/features/topMenu';
import { LayoutProps } from '@/shared/types/pageWithLayouts';
import { Box, Spacer, VStack } from '@chakra-ui/react';

export const MainLayout: LayoutProps = ({ children, isMobileDevice }) => {
  return (
    <ThemeProvider>
      <TopMenu isMobileDevice={isMobileDevice} />
      <VStack as="main">{children}</VStack>
      <Spacer />
      <Footer />
    </ThemeProvider>
  );
};
