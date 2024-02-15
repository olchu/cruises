import {
  Box,
  Button,
  Center,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { ImCheckmark } from 'react-icons/im';
import { useToast } from '@chakra-ui/react';
import { DBCruiseData } from '@/shared/types/dbCruisesType';
import { getCruisesByShip } from '../../api/getCruisesByShip';
import { DBShipsData } from '@/shared/types/dbShipsType';
import { ShipsType } from '@/shared/types/prismaResponse';
import { Providers } from '@/shared/constants/providers';

type DataTypeItem = {
  isLoading: boolean;
  isLoaded: boolean;
  cruises: DBCruiseData[];
  cruisesCount: number;
};

type DataType = Record<number, DataTypeItem>;

export const Cruises = ({ ships }: { ships: ShipsType[] }) => {
  const [data, setData] = useState<DataType>({});
  const toast = useToast();
  // console.log('ship');

  const setIsLoadingTrue = (id: number) => {
    setData((prevSate) => {
      return { ...prevSate, [id]: { ...prevSate[id], isLoading: true } };
    });
  };

  const handleGetCruise = async (ship: ShipsType) => {
    const { extId, id } = ship;
    setIsLoadingTrue(extId);
    const cruises = await getCruisesByShip(extId, id, ship);
    // console.log('cruises', cruises);
    setData((prevSate) => {
      return {
        ...prevSate,
        [extId]: {
          ...prevSate[extId],
          isLoading: false,
          isLoaded: true,
          cruises: cruises?.preparedData || [],
          cruisesCount: cruises?.count || 0,
        },
      };
    });
  };

  const handleGetCruiseList = async () => {
    for (let ship of ships) {
      if (!data[ship.extId]?.isLoaded) {
      }
    }
  };

  const handleSync = async () => {
    let cruises: DBCruiseData[] = [];
    for (let key in data) {
      cruises = [...cruises.concat(data[key].cruises)];
    }

    console.log('cruise fo sync infoflot', cruises)

    const res = await fetch('/api/admin/syncCruises', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cruises ,loadFrom:Providers.infoflot}),
    });

    const responce = await res.json();
    const resSuccess = responce?.length - cruises.length === 0;
    toast({
      title: resSuccess ? 'Успешно' : 'Внимание!!!',
      description:
        'Синхранизировано ' +
        responce?.length +
        ' круизов из ' +
        cruises.length,
      status: responce?.length - cruises.length === 0 ? 'success' : 'warning',
      duration: 99999999,
      isClosable: true,
      position: 'bottom-right',
    });
  };

  return (
    <>
      <Stack
        direction={['column', 'row']}
        alignItems="center"
        spacing={4}
        mb="8"
      >
        <Text>Загрузить круизы из Инфофлот</Text>
        <Button
          onClick={handleGetCruiseList}
          colorScheme="yellow"
          // isLoading={isFetchingCruiseList}
        >
          Загрузить все
        </Button>
        <Button
          onClick={handleSync}
          colorScheme="yellow"
          // isLoading={isFetchingCruiseList}
        >
          Синхранизировать
        </Button>
      </Stack>

      <Box width="full" overflowX="scroll">
        <TableContainer>
          <Table variant="striped" colorScheme="orange" size="sm">
            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>extId</Th>
                <Th>Теплоход</Th>
                <Th>
                  <Center alignItems="center">Кол-во круизов</Center>
                </Th>
                <Th>
                  <Center alignItems="center">Загрузить</Center>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {ships.map((ship) => {
                return (
                  <Tr key={ship.id}>
                    <Td>{ship.id}</Td>
                    <Td>{ship.extId}</Td>
                    <Td>{ship.name}</Td>
                    <Td>
                      <Center alignItems="center">
                        {data[ship.extId]?.cruisesCount || 'не загружено'}
                      </Center>
                    </Td>
                    <Td>
                      <Center alignItems="center" color="green">
                        {data[ship.extId]?.isLoaded ? (
                          <Text fontSize="xl">
                            <ImCheckmark />
                          </Text>
                        ) : (
                          <Button
                            colorScheme="yellow"
                            size="xs"
                            onClick={() => handleGetCruise(ship)}
                            isLoading={data[ship.extId]?.isLoading}
                          >
                            загрузить
                          </Button>
                        )}
                      </Center>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

const mockCruise = {
  extId: 17639,
  title: 'Край ста тысяч песен',
  dateStart: '2024-05-03T17:00:00.000Z',
  dateEnd: '2024-05-05T16:00:00.000Z',
  cityStart: 'Нижний Новгород',
  cityEnd: 'Нижний Новгород',
  days: 3,
  route: [
    {
      id: 77806,
      name: 'Нижний Новгород',
      in: '2024-05-03 00:00:00',
      out: '2024-05-03 20:00:00',
      annotation:
        '<p>Отправление в рейс. Посадка за 2 часа до отправления. Время\r\nмосковское.\r\n</p><p>Вас встретят у трапа теплохода, помогут с багажом и зарегистрируют на рейс.\r\n</p><p>После регистрации вам выдадут ключ от вашей <a style="color: blue;" href="https://vodohod.com/for-travellers/before/ship-facilities/">каюты</a>, приглашение в <a style="color: blue;" href="https://vodohod.com/for-travellers/onboard/dining/">ресторан</a> (номер закреплённого за вами столика), <a style="color: blue;" href="https://vodohod.com/for-travellers/onboard/payment-for-services-on-the-ship/">расчётную карту</a> компании «ВодоходЪ», бланк <a style="color: blue;" href="https://vodohod.com/for-travellers/onboard/excursion-program/">заказа экскурсий</a> (для заполнения в первый день круиза).\r\n</p><p>Первая услуга по питанию – ужин. Каждый день на борту теплохода вас будет ждать <a style="color: blue;" href="https://vodohod.com/for-travellers/onboard/entertainment/">развлекательная программа</a>.\r\n</p>',
    },
    {
      id: 77807,
      name: 'Козьмодемьянск',
      in: '2024-05-04 09:00:00',
      out: '2024-05-04 12:00:00',
      annotation: '',
    },
    {
      id: 77808,
      name: 'Чебоксары',
      in: '2024-05-04 15:30:00',
      out: '2024-05-04 20:00:00',
      annotation: '',
    },
    {
      id: 77809,
      name: 'Макарьево',
      in: '2024-05-05 09:00:00',
      out: '2024-05-05 13:00:00',
      annotation: '',
    },
    {
      id: 77810,
      name: 'Нижний Новгород',
      in: '2024-05-05 19:00:00',
      out: '2024-05-06 00:00:00',
      annotation:
        '<p>По окончании нашего путешествия вам нужно будет вернуть\r\nустройство аудиогида, закрыть бортовой счёт и сдать ключ от каюты.</p><p>Также при желании вы сможете приобрести памятные сувениры,\r\nзаполнить анкету с отзывами и оставить чаевые на ресепшене.</p><p>Теплоход прибывает по московскому времени.</p><p>Последняя услуга по питанию - ужин.</p>',
    },
  ],
  citiesInRoute: [
    'Нижний Новгород',
    'Козьмодемьянск',
    'Чебоксары',
    'Макарьево',
    'Нижний Новгород',
  ],
  shortRoute:
    'Нижний Новгород → Козьмодемьянск → Чебоксары → Макарьево → Нижний Новгород',
  extShipId: 6,
  shipId: 1,
  shipName: 'Александр Радищев',
  loadFrom: 'vodohod',
  minPrice: 2380000,
  minDiscountPrice: 2380000,
  prices: {
    Шлюпочная: {
      Двухместная: {
        dicountedVal: 3040000,
        val: 4560000,
        annotation:
          'Однокомнатная одноярусная каюта с удобствами, рассчитанная на размещение до двух человек',
        description:
          '<p>В каюте: два спальных места, шкаф для одежды, радио, телевизор, душ, санузел, холодильник, кондиционер, обзорное окно, электророзетка на 220V, фен.</p><p>Площадь кают на шлюпочной и средней палубе — <strong>9,8 м2</strong>,<span class="redactor-invisible-space"> на главной палубе — <strong>8,5 м2</strong></span></p><p><span class="redactor-invisible-space"><strong></strong></span>Размер кроватей <strong>75х190 см</strong></p><p><br></p>',
        thumbnails: [
          'https://storage-crs.vodohod.com/source//base/1/sBG8F_q1ky4IvoLKDwEh5wAr7IJ5qHac.jpg',
          'https://storage-crs.vodohod.com/source//base/1/TAHkfZ4-8dsMRA_ZKtSlG_zFdbS-jcwT.jpg',
          'https://storage-crs.vodohod.com/source//base/1/Xz3DkG8PJMgb1yQ8ZNnOkkao5iXevp86.jpg',
          'https://storage-crs.vodohod.com/source//base/1/uiS-RCNSa74ZiHLNUKZaOvxuNtJeu1pr.jpg',
        ],
      },
      Одноместная: {
        dicountedVal: 3770000,
        val: 3770000,
        annotation:
          'Однокомнатная каюта с удобствами, рассчитанная на размещение одного человека',
        description:
          '<p>В каюте: одно спальное место, шкаф для одежды, радио, телевизор, душ, санузел, холодильник, кондиционер, обзорное окно, электророзетка на 220V, фен. </p><p>Площадь каюты на средней палубе — <strong>6,8 м2</strong></p><p>Площадь кают на шлюпочной палубе: 429-432 — <strong>6,3 м2</strong><span class="redactor-invisible-space" style="background-color: initial;">, 433-436 — <strong>7,4 м2</strong></span></p><p><span class="redactor-invisible-space">Размер кроватей <strong>75х190 см</strong><br></span></p>',
        thumbnails: [
          'https://storage-crs.vodohod.com/source//base/1/xw__Z6eLryiA3S7gtkXXo4BSDhPdueOW.jpg',
          'https://storage-crs.vodohod.com/source//base/1/VZvUbW2mZkeOEuFENstpcFaTu0HJnyLE.jpg',
          'https://storage-crs.vodohod.com/source//base/1/MayuGZfg-8SWGt6gX5kKsTasbWKgF1Cb.jpg',
          'https://storage-crs.vodohod.com/source//base/1/8rPFVRPNcXqCHQZG7iVcv5JUiRjmlYlz.jpg',
        ],
      },
    },
    Средняя: {
      'Четырехместная двухъярусная': {
        dicountedVal: 2900000,
        val: 3770000,
        annotation:
          'Однокомнатная двухъярусная каюта с удобствами, рассчитанная на размещение до четырех человек',
        description:
          '<p>Просторная каюта с современным интерьером, четыре отдельных\r\nспальных места, шкаф для одежды, журнальный столик, телевизор c DVD,\r\nхолодильник, радио, два обзорных окна, электророзетка на 220V, фен. </p><p>При\r\nтрех- и четырехместном размещении третье и четвертое места располагаются вторым\r\nярусом.</p><p>Площадь каюты <strong>13,1 м2</strong><br></p><p>Размер кроватей <strong>75х190 см</strong><br></p>',
        thumbnails: [
          'https://storage-crs.vodohod.com/source//base/1/w_IC17fCEfIfJE4ERp9GNlwhaxm6iOsy.jpg',
        ],
      },
      'Полулюкс «А» трехместный': {
        dicountedVal: 4890000,
        val: 9780000,
        annotation:
          'Однокомнатная каюта с удобствами, рассчитанная на размещение от двух до трех человек',
        description:
          '<p>Просторная каюта с современным интерьером, мягкая мебель — диван, два кресла, двуспальная кровать, шкаф для одежды, телевизор c DVD, холодильник, радио, три обзорных окна, электророзетка на 220V, фен, кондиционер.\r\n</p><p><strong>Дополнительные привилегии для гостей кают класса «Полулюкс»:</strong>\r\n</p><p>— кофе порционный (ежедневное пополнение);\r\n</p><p>— игристое вино (1 бутылка на каюту) в день посадки, без пополнения только в рейсах от 6 дней;\r\n</p><p>— чайный набор в рейсах любой продолжительности (ежедневное пополнение);\r\n</p><p>Площадь каюты <strong>19,2 м2</strong><span></span>\r\n</p>',
        thumbnails: [
          'https://storage-crs.vodohod.com/source//base/1/rXCLy1_jRxMEO9Nz-Jzg9DHU-hNdIxYb.jpg',
          'https://storage-crs.vodohod.com/source//base/1/faHS-TNXgpkkTGk61uNnOgONNfaa8oZn.jpg',
          'https://storage-crs.vodohod.com/source//base/1/iGcj9_OClKly2ygZWS9yoB2vgYksurcP.jpg',
          'https://storage-crs.vodohod.com/source//base/1/dtpwZwIKjk2mQH4hmEXeNtCKS0CE-U5-.jpg',
        ],
      },
      Двухместная: {
        dicountedVal: 2900000,
        val: 4340000,
        annotation:
          'Однокомнатная одноярусная каюта с удобствами, рассчитанная на размещение до двух человек',
        description:
          '<p>В каюте: два спальных места, шкаф для одежды, радио, телевизор, душ, санузел, холодильник, кондиционер, обзорное окно, электророзетка на 220V, фен.</p><p>Площадь кают на шлюпочной и средней палубе — <strong>9,8 м2</strong>,<span class="redactor-invisible-space"> на главной палубе — <strong>8,5 м2</strong></span></p><p><span class="redactor-invisible-space"><strong></strong></span>Размер кроватей <strong>75х190 см</strong></p><p><br></p>',
        thumbnails: [
          'https://storage-crs.vodohod.com/source//base/1/sBG8F_q1ky4IvoLKDwEh5wAr7IJ5qHac.jpg',
          'https://storage-crs.vodohod.com/source//base/1/TAHkfZ4-8dsMRA_ZKtSlG_zFdbS-jcwT.jpg',
          'https://storage-crs.vodohod.com/source//base/1/Xz3DkG8PJMgb1yQ8ZNnOkkao5iXevp86.jpg',
          'https://storage-crs.vodohod.com/source//base/1/uiS-RCNSa74ZiHLNUKZaOvxuNtJeu1pr.jpg',
        ],
      },
      'Люкс четырехместный': {
        dicountedVal: 5790000,
        val: 11570000,
        annotation:
          'Двухкомнатная каюта с удобствами, рассчитанная на размещение от двух до четырех человек. ',
        description:
          '<p>Комфортабельная гостиная с современным интерьером, мягкая мебель (два кресла, диван, раскладывающийся на двух человек), журнальный столик, шкаф-стенка, телевизор c DVD, холодильник, радио, два обзорных окна, кондиционер, электророзетка на 220V. <br>\r\n</p><p>В спальне: двуспальная кровать, шкаф-купе, трюмо, сейф, два обзорных окна, фен, кондиционер.\r\n</p><p><strong>Дополнительные привилегии для гостей кают класса «Люкс»:</strong>\r\n</p><p>— капсульная кофемашина – 1 капсула в день на человека (по количеству гостей в каюте), кофе порционный (если нет капсульной кофемашины в каюте);\r\n</p><p>— игристое вино (1 бутылка на каюту) в день посадки, без пополнения только в рейсах от 6 дней;\r\n</p><p>— чайный набор в рейсах любой продолжительности (ежедневное пополнение);\r\n</p><p>— обслуживание в каюте*: заказ блюд и напитков по действующему прайс-листу из Бара, обслуживание бесплатно; заказ блюд и напитков по основному меню ресторана, обслуживание платно.\r\n</p><p><i>*время предоставления услуги ограничено, уточняйте подробные условия дополнительно на теплоходе</i>\r\n</p><p>Площадь каюты <strong>31,9 м2</strong> (спальня - 18,8 м2, гостиная - 13,1 м2).<span class="redactor-invisible-space"></span><br>\r\n</p>',
        thumbnails: [
          'https://storage-crs.vodohod.com/source//base/1/cH9DHnyANiPBDHggqEZ2EZbJnitsrvyo.jpg',
          'https://storage-crs.vodohod.com/source//base/1/fyHUkGIorHQ5yavyGRvr9lz5Df0F557y.jpg',
          'https://storage-crs.vodohod.com/source//base/1/1YIa4hKs0ARLZPMTkC15gI6zHbNBHeZs.jpg',
          'https://storage-crs.vodohod.com/source//base/1/qRLMXfjLSVyVhDQakynJdu3plPZFOj98.jpg',
          'https://storage-crs.vodohod.com/source//base/1/RKnq1Ba_s0EHlNZg0ddZ0TXQDjREAx12.jpg',
        ],
      },
      Одноместная: {
        dicountedVal: 3500000,
        val: 3500000,
        annotation:
          'Однокомнатная каюта с удобствами, рассчитанная на размещение одного человека',
        description:
          '<p>В каюте: одно спальное место, шкаф для одежды, радио, телевизор, душ, санузел, холодильник, кондиционер, обзорное окно, электророзетка на 220V, фен. </p><p>Площадь каюты на средней палубе — <strong>6,8 м2</strong></p><p>Площадь кают на шлюпочной палубе: 429-432 — <strong>6,3 м2</strong><span class="redactor-invisible-space" style="background-color: initial;">, 433-436 — <strong>7,4 м2</strong></span></p><p><span class="redactor-invisible-space">Размер кроватей <strong>75х190 см</strong><br></span></p>',
        thumbnails: [
          'https://storage-crs.vodohod.com/source//base/1/xw__Z6eLryiA3S7gtkXXo4BSDhPdueOW.jpg',
          'https://storage-crs.vodohod.com/source//base/1/VZvUbW2mZkeOEuFENstpcFaTu0HJnyLE.jpg',
          'https://storage-crs.vodohod.com/source//base/1/MayuGZfg-8SWGt6gX5kKsTasbWKgF1Cb.jpg',
          'https://storage-crs.vodohod.com/source//base/1/8rPFVRPNcXqCHQZG7iVcv5JUiRjmlYlz.jpg',
        ],
      },
    },
    Главная: {
      Двухместная: {
        dicountedVal: 2840000,
        val: 4260000,
        annotation:
          'Однокомнатная одноярусная каюта с удобствами, рассчитанная на размещение до двух человек',
        description:
          '<p>В каюте: два спальных места, шкаф для одежды, радио, телевизор, душ, санузел, холодильник, кондиционер, обзорное окно, электророзетка на 220V, фен.</p><p>Площадь кают на шлюпочной и средней палубе — <strong>9,8 м2</strong>,<span class="redactor-invisible-space"> на главной палубе — <strong>8,5 м2</strong></span></p><p><span class="redactor-invisible-space"><strong></strong></span>Размер кроватей <strong>75х190 см</strong></p><p><br></p>',
        thumbnails: [
          'https://storage-crs.vodohod.com/source//base/1/sBG8F_q1ky4IvoLKDwEh5wAr7IJ5qHac.jpg',
          'https://storage-crs.vodohod.com/source//base/1/TAHkfZ4-8dsMRA_ZKtSlG_zFdbS-jcwT.jpg',
          'https://storage-crs.vodohod.com/source//base/1/Xz3DkG8PJMgb1yQ8ZNnOkkao5iXevp86.jpg',
          'https://storage-crs.vodohod.com/source//base/1/uiS-RCNSa74ZiHLNUKZaOvxuNtJeu1pr.jpg',
        ],
      },
    },
    Нижняя: {
      Трехместная: {
        dicountedVal: 2380000,
        val: 2670000,
        annotation:
          'Однокомнатная одноярусная каюта  с удобствами, рассчитанная на размещение до трех человек',
        description:
          '<p>В каюте: три спальных места, шкаф для одежды, радио, телевизор, душ, санузел, холодильник, кондиционер, два иллюминатора, электророзетка на 220V, фен. <br></p><p>Возможна продажа каюты в 2-местном 1-ярусном размещении (по стоимости 2-местной одноярусной каюты).</p><p>Площадь каюты <strong>11 м2</strong><br></p><p>Размер кроватей <strong>75х190 см</strong><br></p>',
        thumbnails: [
          'https://storage-crs.vodohod.com/source//base/1/OmWQWlmK-t2XG5Hsmaci2Qwk1mvLMaw2.jpg',
          'https://storage-crs.vodohod.com/source//base/1/SP0UcY_rFZhSoV7LUyuv-IzE93jhvvV4.jpg',
          'https://storage-crs.vodohod.com/source//base/1/4VDRvmTlQXVxHVjy5pjtKkZPx-Y35mtk.jpg',
        ],
      },
    },
  },
  description:
    '<p>Насыщенное путешествие <strong>«Край ста тысяч песен»</strong> проходит на <a style="color: blue;" rel="color: blue;" href="https://vodohod.com/ships/radishchev/">комфортабельном теплоходе «Александр Радищев»</a> класса <a style="color: blue;" href="https://vodohod.com/ships/classes">Водоход</a>. Удобство перемещения, интересные экскурсии, новые впечатления и возможность быть всегда на «первой» линии – это всё круизы с «ВодоходЪ».\r\n</p><p>В нашем путешествии вы посетите 3 стоянки, каждая из который отличается самобытностью и колоритом. У вас будет отличная возможность отдохнуть от городской суеты, оценить гастрономическую концепцию «Родные берега», сделать множество красивых фотографий, попробовать местную кухню и ощутить неповторимый колорит путешествия по реке.\r\n</p><p><strong> </strong>\r\n</p><p><strong>Чем знамениты стоянки на маршруте?</strong>\r\n</p><p><strong>Чебоксары</strong> – уникальный город, который был построен по приказу Ивана Грозного в XVI веке и являлся известным торговым центром Поволжья. Сегодня здесь находится Речной порт, Красная площадь, Введенский собор и Успенская церковь, набережная Волги и Свято-Троицкий мужской монастырь.\r\n</p><p><strong>Макарьево</strong> – колоритный посёлок, который вырос вокруг Макарьевского Желтоводского монастыря, основанного в 1435 году. Вблизи монастыря находилась знаменитая ярмарка, где сбывались пушнина, ткани, рыба, изделия из металла и зерно. Сегодня в посёлке можно увидеть Казанскую церковь, архитектурный ансамбль Макарьевского Желтоводского монастыря, включающий Троицкую, Успенскую церкви, монашеские кельи и другие постройки, памятник Макарию Желтоводскому. Вблизи посёлка расположена страусиная ферма.<span class="redactor-invisible-space"></span>\r\n</p><p><strong>Козьмодемьянск </strong>– один из красивейших городов России, расположенный в Республике Марий Эл. Козьмодемьянск основал русский царь Иван Грозный после победы над казанским царством. Еще с XVII века Козьмодемьянск был участком транзита на Волге, здесь проживало множество богатых купцов, а сам город процветал. Сегодня здесь можно увидеть церковь Живоначальной Троицы, затейливые деревянные и каменные купеческие особняки с великолепной пропильной резьбой, во многих из которых работают музейные экспозиции.       <br>\r\n</p><p><span class="redactor-invisible-space"></span>\r\n</p>',
  restaurants:
    '<p style="text-align: justify;">\r\n\t<strong>Организация питания на навигацию 2024 года осуществляется в соответствии с выбранным тарифом:</strong>\r\n</p>\r\n<p> <strong>Базовый тариф (рассадка в ресторане «Волга» – главная палуба):</strong>\r\n</p>\r\n<ul>\r\n\t<li><strong>Завтрак</strong> — шведский стол, фиксированная рассадка. Включённые  напитки (без ограничения): вода, сок, чай, кофе. В рейсах до 4-х дней при ранней высадке в день прибытия завтрак континентальный; </li>\r\n\t<li> <strong>Обед</strong> — заказная система питания (выбор блюд со 2-го дня круиза), фиксированная рассадка. Включённые  напитки (без ограничения): вода, чай, кофе, морс; </li>\r\n\t<li> <strong>Ужин</strong> — заказная система питания (выбор блюд со 2-го дня круиза). Включённые  напитки (без ограничения): вода, чай, кофе, кисломолочный напиток (1 стакан 200 мл. на ужин по запросу гостя).</li>\r\n</ul>\r\n<p> <strong>Расширенный тариф (рассадка в ресторане «Нева» – средняя палуба, количество мест ограничено):</strong>\r\n</p>\r\n<p><strong> </strong>\r\n</p>\r\n<ul>\r\n\t<li>Для кают класса «Люкс» и «Полулюкс» расширенный тариф предусмотрен по умолчанию. </li>\r\n\t<li><strong>Завтрак</strong> — шведский стол, фиксированная рассадка. Включённые  напитки (без ограничения): вода, сок, чай, кофе. В рейсах до 4-х дней при ранней высадке в день прибытия завтрак континентальный; </li>\r\n\t<li> <strong>Обед</strong> — заказная система питания (выбор блюд со 2-го дня круиза), фиксированная рассадка. Включённые  напитки (без ограничения): вода, чай, кофе, морс; </li>\r\n\t<li> <strong>Ужин</strong> — заказная система питания (выбор блюд со 2-го дня круиза). Включённые  напитки (без ограничения): вода, чай, кофе, кисломолочный напиток (1 стакан 200 мл на ужин по запросу гостя). На выбор: вино красное / белое / игристое (1 бокал, 125 мл) / водка (1 рюмка, 50 мл) / пиво (1 бокал, 300 мл), домашний морс (1 бокал, 200 мл);</li>\r\n\t<li><strong>В баре </strong>бесплатно предоставляются две позиции на одного человека в день на выбор в любой комбинации: кофейные напитки, чайник чая, лимонад, мороженое развесное (2 шарика);</li>\r\n\t<li><strong>Скидка 20% </strong>(предоставляется на борту) на Room service и весь ассортимент бара (не суммируется с другими скидками); </li>\r\n\t<li><strong>Скидка 10%</strong> (предоставляется на борту) на фирменную сувенирную продукцию с символикой компании и аренду спортинвентаря; </li>\r\n\t<li><strong>Скидка 7%</strong> (предоставляется на борту) на экскурсионное обслуживание.</li>\r\n</ul>\r\n<p> <strong>Для всех тарифов:</strong>\r\n</p>\r\n<ul>\r\n\t<li><strong>Каюты класса «Люкс» и «Полулюкс»</strong>: бутилированная вода в каюте (ежедневное пополнение) — 1 бутылка (0,5 л.) на человека в день;</li>\r\n\t<li> <strong>Остальные каюты</strong>: бутилированная вода  (без пополнений, только в день посадки): в рейсах до 4 дней (включительно): 1 бутылка (0,5 л.) на человека; в рейсах от 5 дней до 10 дней (включительно): 1 бутылка (1,5 л.) на человека; в рейсах от 11 до 15 дней (включительно): 2 бутылки (1,5 л.) на человека; в рейсах от 16 до 20 дней (включительно): 3 бутылки (1,5 л.) на человека; в рейсах от 21 до 25 дней: 4 бутылки (1,5 л.) на человека.</li>\r\n</ul>\r\n<p style="text-align: justify;">\r\n\t<strong><i>Компания оставляет за собой право изменить систему питания.</i></strong>',
  included:
    '<ul>\r\n\t<li>Проживание в каюте выбранной категории</li>\r\n\t<li><a style="color: blue;" href="https://vodohod.com/for-travellers/onboard/dining/">Трехразовое питание</a>. В день начала и день окончания круиза питание предоставляется в зависимости от времени посадки и высадки; в случае, если время проведения экскурсии совпадает со временем приема пищи, гостю предоставляется питание в ресторане/кафе города или выдается «ланч-бокс»</li>\r\n\t<li><a style="color: blue;" href="https://vodohod.com/for-travellers/onboard/excursion-program/">Экскурсионное обслуживание</a> согласно программе круиза</li>\r\n\t<li><a style="color: blue;" href="https://vodohod.com/for-travellers/onboard/entertainment/">Культурная программа</a></li>\r\n\t<li><a style="color: blue;" rel="color: blue;" href="https://vodohod.com/for-travellers/before/whats-included/">Оздоровительные услуги</a></li>\r\n</ul>',
  excluded:
    '<ul>\r\n\t<li>Проезд до места посадки на теплоход и от места высадки</li>\r\n\t<li><a style="color: blue;" href="https://vodohod.com/for-travellers/onboard/beverage-packages/">Напитки</a> и закуски в барах</li>\r\n\t<li>Прочие <a style="color: blue;" href="https://vodohod.com/for-travellers/already-booked/additional-services/">дополнительные услуги</a>  на борту теплохода</li>\r\n</ul>',
  image:
    'https://storage-crs.vodohod.com/source//cruise/1/QSOYY67NvMfBU5EgFdE6syfvl9Do5jV5.jpg',
};
