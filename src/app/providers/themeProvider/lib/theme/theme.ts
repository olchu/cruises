import { extendTheme } from '@chakra-ui/react';
import { colors } from './colors';

export const theme = extendTheme({
  colors: colors,
  space: {
    section: {
      mobile: '12px',
      desktop: '30px',
    },
  },
  components: {
    Button: {
      baseStyle: { rounded: 'none' },
    },
  },
});
