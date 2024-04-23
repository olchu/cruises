import { checkboxAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(checkboxAnatomy.keys);

const baseStyle = definePartsStyle({
  control: {
    _checked: {
      background: 'primary',
      border: 'none'
    },
  },
});

export const checkboxTheme = defineMultiStyleConfig({ baseStyle });
