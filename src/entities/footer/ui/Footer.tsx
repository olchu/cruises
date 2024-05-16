import { MainContainer } from '@/shared/ui/mainContainer/MainContainer';
import { Box, Text, Link } from '@chakra-ui/react';
import NextLink from 'next/link';

export const Footer = () => {
  return (
    <Box
      as="footer"
      bg="primary"
      p={{ base: 'section.mobile', lg: 'section.desktop' }}
      color="secondary"
      fontSize={{ base: '12px', lg: '14px' }}
    >
      <MainContainer>
        <Text align="center" fontWeight="bold">
          ООО «Круизная компания Волгобалтийские Путешествия»
        </Text>
        <Text align="center">
          Москва, улица Лесная, д.43, офис 238{' '}
          <Link href="/contacts" as={NextLink} textDecoration="underline">
            (схема проезда)
          </Link>
        </Text>
        <Text align="center">
          Телефон:{' '}
          <Link href="tel:+7(495)543-94-63" as={NextLink}>
            +7(495)543-94-63
          </Link>
          {', '}
          E-mail:{' '}
          <Link href="mail:vbp@vbp.ru" as={NextLink}>
            vbp@vbp.ru
          </Link>
        </Text>
        <Text align="center">
          Информация на сайте не является публичной офертой и носит
          информационный характер. Конкретные характеристики продуктов и условия
          их продаж (в том числе применение акций, скидок и т.п.) уточняйте в
          офисах компании.
        </Text>
        <Text align="center">
          Специальная оценка условий труда –{' '}
          <Link href="/sout.pdf" textDecoration="underline">
            СОУТ
          </Link>
        </Text>
        <Text align="center">
          © 2000 — {new Date(Date.now()).getFullYear()}
        </Text>
      </MainContainer>
    </Box>
  );
};
