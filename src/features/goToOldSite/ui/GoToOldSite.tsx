import { MainContainer } from '@/shared/ui/mainContainer/MainContainer';
import { Box, Text } from '@chakra-ui/react';
import Link from 'next/link';

export const GoToOldSite = () => {
  return (
    <Box bg="accent" color="white">
      <MainContainer
        overflow="hidden"
        p={{ base: '6px', md: '10px' }}
        maxW={'1400px'}
        h="full"
      >
        <Text
          mx="auto"
          textAlign="center"
          fontSize={{ base: '16px', md: '20px' }}
        >
          <Link href="/close">
            С 01.07.2024 ООО «Круизная компания «Волго-Балтийские путешествия»
            приостанавливает свою деятельность.
          </Link>
        </Text>
      </MainContainer>
    </Box>
  );
};
