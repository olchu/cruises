import { MainContainer } from '@/shared/ui/mainContainer/MainContainer';
import { Box, Text } from '@chakra-ui/react';

export const GoToOldSite = () => {
  return (
    <Box bg="warning" >
      <MainContainer overflow="hidden" p="8px"  maxW={'1400px'}>
        <Text mx="auto" textAlign="center">
          Это новая версия сайта vbp.ru. Прежняя версия сайта продолжает
          работать здесь: <a href="https://old.vbp.ru/">old.vbp.ru</a>.
        </Text>
      </MainContainer>
    </Box>
  );
};
