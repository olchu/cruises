import { InfoBox } from '@/features/infoBox/ui/InfoBox';
import { pagesLink } from '@/shared/constants/pagesLink';
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
              img="/img/q.webp"
              title="Скидка 5%"
              description="Круизы для пенсионеров"
              url={pagesLink.pensioneram}
            />
            <InfoBox
              w={{ base: '100%', md: '40%' }}
              h={infoBlockHeight}
              img="/img/q.jpeg"
              title="Семейный отдых"
              description='Акция "Дети бесплатно"'
              url={pagesLink.detiBesplatno}
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
              img="/img/q.jpg"
              title="Уникальные маршруты"
              description="Экспедиционные круизы"
              url={pagesLink.expedition}
            />
            <InfoBox
              w={{ base: '100%', md: '60%' }}
              h={infoBlockHeight}
              img="/img/q.webp"
              title="Морские круизы"
              description="лайнер Astoria Grande"
              url="#"
            />
          </HStack>
        </VStack>
        <InfoBox
          h={{ base: '220px', lg: 'inherit' }}
          w={{ base: '100%', lg: '35%' }}
          img="/img/q.jpg"
          title="т/х Григорий Пирогов"
          description="Еще дешевле"
          url={pagesLink.pirogov}
        />
      </HStack>
    </MainContainer>
  );
};
