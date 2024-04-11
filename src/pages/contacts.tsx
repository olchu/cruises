import { MainLayout } from '@/layouts/main';
import { Heading } from '@/shared/ui/heading';
import { MainContainer } from '@/shared/ui/mainContainer/MainContainer';
import {
  Text,
  Tr,
  Td,
  Table,
  Tbody,
  Box,
  Stack
} from '@chakra-ui/react';
import Head from 'next/head';
import { ReactElement } from 'react';

const Contacts = () => {
  return (
    <>
      <Head>
        <title>
          Контакты. Речные круизы - &quot;Волгобалтийские Путешествия&quot;.
        </title>
        <meta
          name="description"
          content="речные круизы москва речные круизы 2024 речные круизы волга россия супермаркет речных круизов единая сеть речных круизов речные круизы санкт петербург речные круизы пермь валаам
  круизы петербург теплоходы круизы русские круизы проекты теплоходов теплоход проекта 588
  проект 301 пассажирский теплоход проекта 588 теплоходы проекта 302 куда свадебное путешествие свадебные путешествия петербург свадебные путешествия туры свадебное путешествие россия
  ."
        />
        <meta
          name="keywords"
          content='Контакты. Речные круизы - "Волгобалтийские Путешествия".'
        />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <MainContainer
        px={{ base: 'section.mobile', lg: 'section.desktop' }}
        py={{ base: 'section.mobile', lg: 'section.desktop' }}
        maxW={'1400px'}
      >
        <Heading textAlign="left">Контакты</Heading>
        <Table size="sm" maxW="450px" variant="unstyled" mb="30px">
          <Tbody>
            <Tr>
              <Td minW={{ base: '160px', sm: '250px' }}>
                <Text fontSize="16px">Телефон</Text>
                <Text as="span" fontSize="13px" opacity={0.7}>
                  Для звонков из Москвы
                </Text>
              </Td>
              <Td flex="1" color="primary">
                <b>
                  <a href="tel:+74955439463">+7(495)543-94-63</a>
                </b>
              </Td>
            </Tr>
            <Tr>
              <Td minW={{ base: '160px', sm: '250px' }}>
                <Text fontSize="16px">Telegram</Text>
                <Text as="span" fontSize="13px" opacity={0.7}>
                  Написать в Telegram
                </Text>
              </Td>
              <Td flex="1" color="primary">
                <b>
                  <a href="https://t.me/+79031754489">+7 (903) 175-44-89</a>
                </b>
              </Td>
            </Tr>
            <Tr>
              <Td minW={{ base: '160px', sm: '250px' }}>
                <Text fontSize="16px">E-mail: </Text>
              </Td>
              <Td flex="1" color="primary">
                <b>
                  <a href="mailto:vbp@vbp.ru">vbp@vbp.ru</a>
                </b>
              </Td>
            </Tr>
            <Tr>
              <Td minW={{ base: '160px', sm: '250px' }}>
                <Text fontSize="16px">Группа в Telegram</Text>
                <Text as="span" fontSize="13px" opacity={0.7}>
                  Подписка на акции в Telegram канале:
                </Text>
              </Td>
              <Td flex="1" color="primary">
                <b>
                  <a href="https://t.me/vbpcruise">@vbpcruise</a>
                </b>
              </Td>
            </Tr>
            <Tr>
              <Td minW={{ base: '160px', sm: '250px' }}>
                <Text fontSize="16px">Адрес</Text>
              </Td>
              <Td flex="1" color="primary">
                <b>Москва, улица Лесная, д.43, офис 238 (2 Этаж)</b>
              </Td>
            </Tr>
          </Tbody>
        </Table>
        <Heading size={{ base: 'sm', lg: 'lg' }} mb="20px" textAlign="left">
          Как до нас добраться
        </Heading>
        <Stack direction={{ base: 'column', md: 'row' }} gap="20px" mb="30px">
          <Text mb="20px" width={{ base: '100%', md: '30%' }}>
            Проезд до станции метро Белорусская (кольцевая). Выход на улицу
            Лесная. 8 минут пешком от метро. Мы работаем с понедельника по
            пятницу с 10-00 до 19-00, суббота - с 11-00 до 15-00, воскресенье -
            выходной. Ждем вас!
          </Text>

          <Box
            position="relative"
            overflow="hidden"
            width={{ base: '100%', md: '70%' }}
          >
            <iframe
              src="https://yandex.ru/map-widget/v1/?from=mapframe&ll=37.588914%2C55.779075&mode=usermaps&source=mapframe&um=constructor%3A5bb56324b4795a828ee28619592f82f589a97f75107d6299050147d6a65e2504&utm_source=mapframe&z=16"
              width="100%"
              height="400"
              allowFullScreen
              style={{
                position: 'relative',
              }}
            ></iframe>
          </Box>
        </Stack>
        <Heading size={{ base: 'sm', lg: 'lg' }} mb="20px" textAlign="left">
          Реквизиты
        </Heading>

        <Table variant="simple" size="sm">
          <Tbody>
            <Tr>
              <Td>Полное наименование.</Td>
              <Td>
                Общество с ограниченной ответственностью «круизная компания
                Волго-Балтийские Путешествия»
              </Td>
            </Tr>
            <Tr>
              <Td>Сокращенное наименование.</Td>
              <Td>ООО «Круизная компания Волгобалтийские Путешествия»</Td>
            </Tr>
            <Tr>
              <Td>Основной государственный регистрационный номер (огрн)</Td>
              <Td>1087746163372</Td>
            </Tr>
            <Tr>
              <Td>Адрес юридический.</Td>
              <Td>127055, г.Москва, ул.Лесная, д.43</Td>
            </Tr>
            <Tr>
              <Td>Почтовый адрес</Td>
              <Td>127055, г.Москва, ул.Лесная, д.43, оф.238</Td>
            </Tr>
            <Tr>
              <Td>Номера контактных телефонов</Td>
              <Td>
                тел.: (495) 543-94-63, факс: (499) 978-66-69, сайт www.vbp.ru,
                vbp@vbp.ru
              </Td>
            </Tr>
            <Tr>
              <Td>инн / кпп</Td>
              <Td>7707653166 / 770701001</Td>
            </Tr>
            <Tr>
              <Td rowSpan={4}>
                Коды форм федерального государственного статистического
                наблюдения.
              </Td>
              <Td>окпо-84774178</Td>
            </Tr>
            <Tr>
              <Td>окато-45286585000</Td>
            </Tr>
            <Tr>
              <Td>оквэд-79.11</Td>
            </Tr>
            <Tr>
              <Td>окфс-16, окопф-65</Td>
            </Tr>
            <Tr>
              <Td>бик</Td>
              <Td>044525593</Td>
            </Tr>
            <Tr>
              <Td>кор/счет</Td>
              <Td>30101810200000000593</Td>
            </Tr>
            <Tr>
              <Td>Расчетный счет</Td>
              <Td>40702810302370020109</Td>
            </Tr>
            <Tr>
              <Td>Наименование банка</Td>
              <Td>АО &quot;АЛЬФА-БАНК&quot;</Td>
            </Tr>
            <Tr>
              <Td>Генеральный директор</Td>
              <Td>Агеева Светлана Владиславовна</Td>
            </Tr>
          </Tbody>
        </Table>
      </MainContainer>
    </>
  );
};
Contacts.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Contacts;
