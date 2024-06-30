/* eslint-disable react/no-unescaped-entities */
import { MainLayout } from '@/layouts/main';
import { MainContainer } from '@/shared/ui/mainContainer/MainContainer';
import { Text, Heading, OrderedList, ListItem, Link } from '@chakra-ui/react';
import Head from 'next/head';
import { ReactElement } from 'react';

const Close = () => {
  return (
    <>
      <Head>
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
        <div>
          <p>
            <span>Уважаемые клиенты!</span>
          </p>
          <p>
            <br />
          </p>
          <p>
            <span>
              С большим сожалением сообщаем вам, ООО «Круизная компания
              «Волго-Балтийские путешествия», после 24 лет работы на рынке,
              вынуждена приостановить свою деятельность в связи с наличием
              признаков неплатежеспособности и банкротства.
            </span>
          </p>
          <p>
            <br />
          </p>
          <p>
            <span>
              В связи с этим руководством компании принято решение о частичной
              приостановке деятельности. С 01.07.2024 компания больше не будет
              оказывать услуги по подбору и реализации туристического продукта.
            </span>
          </p>
          <p>
            <br />
          </p>
          <p>
            <span>
              Однако со своей стороны мы сделаем все возможное, чтобы
              минимизировать возможный ущерб своим клиентам. Информация о
              статусе Вашего тура будет направлена Вам индивидуально.
            </span>
          </p>
          <p>
            <span>
              Дополнительно сообщаем вам, что согласно ФЗ 132 от 24.11.1996 ред.
              от 25.12.2023 "Об основах туристкой деятельности в Российской
              Федерации": «по договору о реализации туристского продукта,
              заключенному турагентом, туроператор несет ответственность за
              неоказание или ненадлежащее оказание туристу и (или) иному
              заказчику услуг, входящих в туристский продукт, независимо от
              того, кем должны были оказываться или оказывались эти услуги".
            </span>
          </p>
          <p>
            <br />
          </p>
          <p>
            <span>
              На основании всего вышеизложенного, по всем вопросам, связанным с
              вашим туром, просьба обращаться непосредственно к туроператору,
              указанному в вашем Договоре.
            </span>
          </p>
        </div>
      </MainContainer>
    </>
  );
};
Close.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Close;
