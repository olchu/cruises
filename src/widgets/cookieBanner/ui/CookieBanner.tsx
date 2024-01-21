import { getCookieByName } from '@/shared/lib/utils/getCookieByName';
import { MainContainer } from '@/shared/ui/mainContainer/MainContainer';
import { Heading, HStack, Text, Button, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

const COOKIE_BANNER_NAME = 'cookieBanner';

export const CookieBanner = () => {
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    const cookie = getCookieByName(COOKIE_BANNER_NAME);
    console.log('cookie', cookie);
    if (cookie !== 'false') {
      setIsShow(true);
    }
  }, []);

  const handleClose = () => {
    document.cookie = `${COOKIE_BANNER_NAME}=false;max-age=2592000`;
    setIsShow(false);
  };

  if (!isShow) return null;
  return (
    <HStack position="absolute" w="full" bg="lightBlue" bottom={0}>
      <MainContainer
        as="div"
        overflow="hidden"
        px={{ base: 'section.mobile', lg: 'section.desktop' }}
        py={{ base: 'section.mobile', lg: 'section.desktop' }}
        maxW={'1400px'}
        h="full"
      >
        <HStack gap="20px" justifyContent="flex-end">
          <VStack gap="12px" alignItems="flex-start">
            <Heading fontSize="18px">Мы используем файлы cookie.</Heading>
            <Text>
              Некоторые функции могут не работать, если не установлены cookies.
              Чтобы узнать больше об использовании cookies на нашем сайте,
              перейдите на
            </Text>
          </VStack>
          <Button bg="primary" color="white" onClick={handleClose}>
            Закрыть
          </Button>
        </HStack>
      </MainContainer>
    </HStack>
  );
};
