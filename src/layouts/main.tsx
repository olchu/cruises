import { ThemeProvider } from '@/app/providers/themeProvider';
import { Footer } from '@/entities/footer';
import { TopMenu } from '@/features/topMenu';
import { LayoutProps } from '@/shared/types/pageWithLayouts';
import { Box, Spacer, VStack } from '@chakra-ui/react';

export const MainLayout: LayoutProps = ({ children, isMobileDevice }) => {
  return (
    <ThemeProvider>
      <TopMenu isMobileDevice={isMobileDevice} />
      <VStack as="main" gap="0">
        {children}
      </VStack>
      <Spacer />
      <Footer />
    </ThemeProvider>
  );
};
