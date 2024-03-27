import { Box, BoxProps } from '@chakra-ui/react';
import { FC } from 'react';

export const WhiteTransparent: FC<BoxProps & { color?: string,opacity?: string}> = (props) => {
  const { children,color,opacity } = props;

  return (
    <Box
      position="relative"
      backdropFilter="blur(2px)"
      display="flex"
      flexDirection="column"
      alignItems="center"
      _before={{
        background: color || 'white',
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        opacity: opacity || '0.2',
      }}
      {...props}
    >
      {children}
    </Box>
  );
};
