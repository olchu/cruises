import { Box } from '@chakra-ui/react';
import Image from 'next/image';
import logoSrc from '@/shared/assets/img/logo.svg';

export const Logo = () => {
  return (
    <Box as="span" mr={4}>
      <Image priority src={logoSrc} alt="VBP" className="mr-[20px]" />
    </Box>
  );
};
