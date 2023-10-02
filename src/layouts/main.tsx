import { TopMenu } from '@/features/topMenu';
import { LayoutProps } from '@/shared/types/pageWithLayouts';
import { ChakraProvider, HStack } from '@chakra-ui/react';
import Link from 'next/link';

const MainLayout: LayoutProps = ({ children }) => {
  return (
    <ChakraProvider>
      <TopMenu />
      <main>{children}</main>
    </ChakraProvider>
  );
};
export default MainLayout;
