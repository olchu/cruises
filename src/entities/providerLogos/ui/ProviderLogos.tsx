import { Heading } from '@/shared/ui/heading';
import { MainContainer } from '@/shared/ui/mainContainer/MainContainer';
import { Box, Flex } from '@chakra-ui/react';

export const ProviderLogos = () => {
  return (
    <MainContainer
      as="section"
      px={{ base: 'section.mobile', lg: 'section.desktop' }}
    >
      <Heading>Круизные компании</Heading>
      <Flex alignItems="center" justifyContent="center" gap="20px">
        <Box
          w="120px"
          h="120px"
          bgImage="/logos/cesar.png"
          bgPosition="center"
          bgSize="contain"
          bgRepeat="no-repeat"
        />
        <Box
          w="120px"
          h="120px"
          bgImage="/logos/lebed.png"
          bgPosition="center"
          bgSize="contain"
          bgRepeat="no-repeat"
        />
        <Box
          w="120px"
          h="120px"
          bgImage="/logos/mosturflot.png"
          bgPosition="center"
          bgSize="contain"
          bgRepeat="no-repeat"
        />
      </Flex>
      <Flex alignItems="center" justifyContent="center" gap="20px" mt="20px">
        <Box
          w="160px"
          h="120px"
          bgImage="/logos/vodohod.svg"
          bgPosition="center"
          bgSize="contain"
          bgRepeat="no-repeat"
        />
        <Box
          w="160px"
          h="120px"
          bgImage="/logos/infoflot.png"
          bgPosition="center"
          bgSize="contain"
          bgRepeat="no-repeat"
        />
        <Box
          w="160px"
          h="120px"
          bgImage="/logos/knyaz.png"
          bgPosition="center"
          bgSize="contain"
          bgRepeat="no-repeat"
        />
      </Flex>
    </MainContainer>
  );
};
