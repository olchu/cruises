import { MainContainer } from '@/shared/ui/mainContainer/MainContainer';
import { Box, Text } from '@chakra-ui/react';

export const GoToOldSite = () => {
  return (
    <Box bg="success">
      <MainContainer
        overflow="hidden"
        p={{ base: '4px', md: '8px' }}
        maxW={'1400px'}
        h="full"
      >
        <Text mx="auto" textAlign="center" fontSize={{ base: '14px', md: '16px' }}>
          Это новая версия сайта. Прежняя версия сайта продолжает работать
          здесь: <a href="https://old.vbp.ru/">old.vbp.ru</a>.
        </Text>
      </MainContainer>
    </Box>
  );
};
