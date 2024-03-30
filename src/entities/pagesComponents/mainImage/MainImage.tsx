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
      h={{ base: '150px', lg: '250px' }}
      minH={{ base: '150px', lg: '250px' }}
      overflow="hidden"
      position="relative"
    >
      <Image
        src={image}
        alt={title || ''}
        fill={true}
        style={{ objectFit: 'cover' }}
      />
      <Box
        as="span"
        position="absolute"
        px={{ base: 'section.mobile', lg: 'section.desktop' }}
        py={{ base: 'section.mobile', lg: 'section.desktop' }}
        bottom="0"
        left="0"
        bg="linear-gradient(0deg, rgba(0,0,0,0.8057598039215687) 40%, rgba(255,255,255,0) 100%)"
        w="full"
        h="45%"
      />
      {title && (
        <MainContainer as="div" maxW={'1400px'} position="relative" h="full">
          <Text
            position="absolute"
            px={{ base: 'section.mobile', lg: 'section.desktop' }}
            py={{ base: 'section.mobile', lg: 'section.desktop' }}
            bottom="0"
            left="0"
            color="white"
            fontSize="26px"
            fontWeight="bold"
            w="full"
          >
            {title}
          </Text>
        </MainContainer>
      )}
    </Box>
  );
};
