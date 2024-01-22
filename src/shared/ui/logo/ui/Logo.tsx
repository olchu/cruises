import { Box } from '@chakra-ui/react';
import Image from 'next/image';
import logoSrc from '@/shared/assets/img/logo.svg';
import Link from 'next/link';
import { pagesLink } from '@/shared/constants/pagesLink';

export const Logo = () => {
  return (
    <Box as={Link} href={pagesLink.home} mr={4}>
      <Image
        priority
        src="/logo.svg"
        width={85}
        height={45}
        alt="VBP"
        className="mr-[20px]"
      />
    </Box>
  );
};
