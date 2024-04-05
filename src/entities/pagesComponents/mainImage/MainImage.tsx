import { MainContainer } from '@/shared/ui/mainContainer/MainContainer';
import { Text, Box } from '@chakra-ui/react';
import Image from 'next/image';

type MainImageProps = {
  image: string;
  title?: string;
};

export const MainImage = ({ image, title }: MainImageProps) => {
  return (
    <Box
      w="full"
      h={{ base: '120px', lg: '200px' }}
      minH={{ base: '120px', lg: '200px' }}
      overflow="hidden"
      position="relative"
    >
      <Image
        src={image}
        alt={title || ''}
        fill={true}
        style={{ objectFit: 'cover' }}
        priority
      />
    </Box>
  );
};
