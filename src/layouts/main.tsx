import { ThemeProvider } from '@/app/providers/themeProvider';
import { Footer } from '@/features/footer';
import { TopMenu } from '@/features/topMenu';
import { LayoutProps } from '@/shared/types/pageWithLayouts';
import { Box, Spacer, VStack } from '@chakra-ui/react';

export const MainLayout: LayoutProps = ({ children }) => {
  return (
    <ThemeProvider>
      <Box height="100%">
        <TopMenu />
        <VStack as="main">{children}</VStack>
        <Spacer />
        <Footer />
      </Box>
    </ThemeProvider>
  );
};
