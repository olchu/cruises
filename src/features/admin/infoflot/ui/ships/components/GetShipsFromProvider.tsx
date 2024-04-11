import { Providers } from '@/shared/constants/providers';
import { Stack, Button, Text, ListItem, OrderedList } from '@chakra-ui/react';
import { useState } from 'react';
import { getShipFromInfoflot } from '../../../api/getShipFromInfoflot';
import {
  DBShipsData,
  prepareInfoflotShips,
} from '../utils/prepareInfoflotShips';

export const GetShipsFromProvider = () => {
  const [prepareData, setPrepareData] = useState<DBShipsData[] | null>(null);

  const loadShip = async () => {
    const arr = [];
    for (const i in InfoflotShipsId) {
      const ship = await getShipFromInfoflot(InfoflotShipsId[i]);
      if (ship?.id) arr.push(ship);
    }

    const prepareData = await prepareInfoflotShips(arr);
    setPrepareData(prepareData);
    console.log('prepareData', prepareData);
  };

  const handleSync = async () => {
    if (!prepareData) return;

    const res = await fetch('/api/admin/syncShips', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ships: prepareData,
        provider: Providers.infoflot,
      }),
    });
  };

  // const handlePrepare = async (ships: ShipsData[]) => {
  //   const prepare = await prepareShips(ships, token);
  //   console.log('ships', prepare);

  //   setPrepareData(prepare);
  // };

  // useEffect(() => {
  //   if (ships) {
  //     handlePrepare(ships);
  //   }
  // }, [ships]);

  return (
    <>
      <Stack direction="row" spacing={4} align="center">
        <Text fontSize="lg">Получить теплоходы от провайдера</Text>
        <Button colorScheme="yellow" onClick={loadShip}>
          Получить
        </Button>
      </Stack>
      {prepareData && (
        <Stack direction="column" spacing={6}>
          <Stack direction="row" spacing={4} align="center">
            <Text fontSize="lg">
              Будет загружено: {prepareData?.length} теплоходов
            </Text>
            <Button colorScheme="green" onClick={handleSync}>
              Загрузить
            </Button>
          </Stack>
          <OrderedList spacing={0}>
            {prepareData.map(({ extId, name }) => (
              <ListItem key={extId}>{name}</ListItem>
            ))}
          </OrderedList>
        </Stack>
      )}
    </>
  );
};

const InfoflotShipsId = [
  1, 47, 46, 84, 99, 214, 251, 44, 260, 2, 103, 27, 3, 4, 595, 478, 104, 487,
  230, 973, 38, 219, 77, 498, 25, 141, 64, 461, 252, 228, 981, 462, 963, 227,
  250, 970, 430, 975, 365, 982, 362, 988, 83, 969,991,992
];
// const InfoflotShipsId = [
//   1,
// ];
