import { MainContainer } from '@/shared/ui/mainContainer/MainContainer';
import { Box, Flex, Text } from '@chakra-ui/react';

export const BlueBlock = () => {
  return (
    <MainContainer
      as="section"
      px={{ base: 'section.mobile', lg: 'section.desktop' }}
      py={{ base: '30px', lg: '60px' }}
      display="flex"
      flexDirection={{ base: 'column-reverse', lg: 'row' }}
    >
      <Box
        w="full"
        p="20px"
        color="white"
        background="linear-gradient(302deg, #003267 -9.31%, #3A8CBD 89.55%);"
      >
        <Text
          whiteSpace="pre-wrap"
          textAlign="left"
          fontSize={{ base: '14px', lg: '18px' }}
        >
          {`Круиз на теплоходе — это уникальная возможность открыть для себя совершенно новый вид отдыха. Путешествие по воде поможет по-настоящему отдохнуть от городской суеты, ощутить полную гармонию с природой и познакомиться с многовековой историей самых интересных городов России.\n\nТуроператор «Волго-балтийские путешествия» предлагает Вам совершить незабываемую водную поездку.\n\nЧистый воздух, красивейшая природа России, интересная развлекательная программа — все это сделает отдых увлекательным и полезным.`}
        </Text>
      </Box>
      <Box
        w="full"
        h={{ base: '230px', lg: 'full' }}
        bgImage="/img/hero_bg.png"
        bgPosition="center"
        bgSize="cover"
      />
    </MainContainer>
  );
};
