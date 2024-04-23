import { extendTheme } from '@chakra-ui/react';
import { colors } from './colors';
import { Roboto } from 'next/font/google';
import { switchTheme } from './switchTheme';
import { checkboxTheme } from './checkboxTheme';

const roboto = Roboto({
  weight: ['300', '400', '700', '900'],
  style: ['normal', 'italic'],
  subsets: ['cyrillic'],
  display: 'swap',
});

export const theme = extendTheme({
  fonts: { heading: roboto.style.fontFamily, body: roboto.style.fontFamily },
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
      // TODO add colorSheme
    },
    Switch: switchTheme,
    Checkbox:checkboxTheme,
  },
});
