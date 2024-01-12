import { switchAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(switchAnatomy.keys);

const baseStyle = definePartsStyle({
  container: {
    // ...
  },
  thumb: {
    // bg: 'red.500',
  },
  track: {
    bg: 'gray.200',
    _checked: {
      bg: 'primary',
    },
  },
});

export const switchTheme = defineMultiStyleConfig({ baseStyle });
