import { InfoBox } from '@/features/infoBox/ui/InfoBox';
import { MainContainer } from '@/shared/ui/mainContainer/MainContainer';
import { HStack, VStack } from '@chakra-ui/react';

const infoBlockHeight = { base: '220px' };

export const StockWidget = () => {
  return (
    <MainContainer
      as="section"
      px={{ base: 'section.mobile', lg: 'section.desktop' }}
      py={{ base: '30px', lg: '60px' }}
    >
      <HStack
        gap={{ base: '10px', lg: '20px' }}
        justifyContent="stretch"
        alignItems="stretch"
        flexWrap={{ base: 'wrap', lg: 'nowrap' }}
      >
        <VStack gap={{ base: '10px', lg: '20px' }} flex={1}>
          <HStack
            gap={{ base: '10px', lg: '20px' }}
            flex={1}
            w="full"
            flexWrap={{ base: 'wrap', md: 'nowrap' }}
          >
            <InfoBox
              w={{ base: '100%', md: '60%' }}
              h={infoBlockHeight}
              img="/img/2.jpeg"
              title="Круизы по черному морю"
              description="Рассписание на 2023 год"
              url="#"
            />
            <InfoBox
              w={{ base: '100%', md: '40%' }}
              h={infoBlockHeight}
              img="/img/3.jpeg"
              title="Скидка 11% + 5%"
              description="Сезонная скидка до 15 марта"
              url="#"
            />
          </HStack>
          <HStack
            gap={{ base: '10px', lg: '20px' }}
            flex={1}
            w="full"
            flexWrap={{ base: 'wrap', md: 'nowrap' }}
          >
            <InfoBox
              w={{ base: '100%', md: '40%' }}
              h={infoBlockHeight}
              img="/img/4.jpeg"
              title="Эконом класс стал еще дешевле"
              description="Скидка 20% до 31 января"
              url="#"
            />
            <InfoBox
              w={{ base: '100%', md: '60%' }}
              h={infoBlockHeight}
              img="/img/5.jpeg"
              title="Супер Акция!!!"
              description="Тут будет название акции"
              url="#"
            />
          </HStack>
        </VStack>
        <InfoBox
          h={{ base: '220px', lg: 'inherit' }}
          w={{ base: '100%', lg: '35%' }}
          img="/img/1.jpeg"
          title="Акция “дети бесплатно”"
          description="Семейные круизы по рекам России"
          url="#"
        />
      </HStack>
    </MainContainer>
  );
};
