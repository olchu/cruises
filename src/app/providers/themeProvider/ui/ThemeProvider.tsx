import { ChakraProvider } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { theme } from '../lib/theme/theme';

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};
