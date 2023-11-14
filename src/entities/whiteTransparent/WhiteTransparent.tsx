import { Box, BoxProps } from '@chakra-ui/react';
import { FC } from 'react';

export const WhiteTransparent: FC<BoxProps> = (props) => {
  const { children } = props;

  return (
    <Box
      position="relative"
      backdropFilter="blur(2px)"
      display="flex"
      flexDirection="column"
      alignItems="center"
      _before={{
        background: 'white',
        content: '""',
        position: 'absolute',
        top: 0,
        left:0,
        height: '100%',
        width: '100%',
        opacity: '0.2',
      }}
       {...props}
    >
      {children}
    </Box>
  );
};
