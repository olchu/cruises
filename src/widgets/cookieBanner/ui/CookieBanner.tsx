import { pagesLink } from '@/shared/constants/pagesLink';
import { getCookieByName } from '@/shared/lib/utils/getCookieByName';
import { MainContainer } from '@/shared/ui/mainContainer/MainContainer';
import { Heading, HStack, Text, Button, VStack, Link } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import NextLink from 'next/link';
import { useEffect, useState } from 'react';

const COOKIE_BANNER_NAME = 'cookieBanner';

const MotionHStack = motion(HStack);

export const CookieBanner = () => {
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    const cookie = getCookieByName(COOKIE_BANNER_NAME);
    if (cookie !== 'false') {
      setIsShow(true);
    }
  }, []);

  const handleClose = () => {
    document.cookie = `${COOKIE_BANNER_NAME}=false;max-age=2592000`;
    setIsShow(false);
  };

  const bannerVariants = {
    hidden: { bottom: -140 },
    visible: { bottom: 0 },
  };

  return (
    <AnimatePresence>
      {isShow && (
        <MotionHStack
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={bannerVariants}
          transition={{ duration: 0.6, type: 'spring' }}
          position="fixed"
          w="full"
          bg="lightBlue"
          bottom={0}
        >
          <MainContainer
            as="div"
            overflow="hidden"
            px={{ base: 'section.mobile', lg: 'section.desktop' }}
            py={{ base: 'section.mobile', lg: 'section.desktop' }}
            maxW={'1400px'}
            h="full"
          >
            <HStack gap="20px" justifyContent="flex-start">
              <VStack gap="12px" alignItems="flex-start">
                <Heading fontSize="18px">Мы используем файлы cookie.</Heading>
                <Text>
                  Некоторые функции могут не работать, если не установлены
                  cookies. Чтобы узнать больше об использовании cookies на нашем
                  сайте, перейдите на{' '}
                  <Link as={NextLink} href={pagesLink.privacy} color="primary">
                    информационную страницу Cookies
                  </Link>
                </Text>
              </VStack>
              <Button bg="primary" color="white" onClick={handleClose}>
                Закрыть
              </Button>
            </HStack>
          </MainContainer>
        </MotionHStack>
      )}
    </AnimatePresence>
  );
};
