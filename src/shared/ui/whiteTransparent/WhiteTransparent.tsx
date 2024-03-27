import { Box, BoxProps } from '@chakra-ui/react';
import { FC } from 'react';

export const WhiteTransparent: FC<BoxProps & { titleBg?: string,opacityTitleBg?: string}> = (props) => {
  const { children,titleBg,opacityTitleBg } = props;

  return (
    <Box
      position="relative"
      backdropFilter="blur(2px)"
      display="flex"
      flexDirection="column"
      alignItems="center"
      _before={{
        background: titleBg || 'white',
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        opacity: opacityTitleBg || '0.2',
      }}
      {...props}
    >
      {children}
    </Box>
  );
};
