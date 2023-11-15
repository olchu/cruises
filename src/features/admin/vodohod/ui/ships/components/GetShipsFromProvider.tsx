import { useGetShips } from '@/features/admin/vodohod/api/useGetShips';
import { Stack, Button, Text, ListItem, OrderedList } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { DBShipsData, prepareShips } from '../utils/prepareShips';

export const GetShipsFromProvider = () => {
  const [prepareData, setPrepareData] = useState<DBShipsData[] | null>(null);
  const { error, getShips, ships, isFetching } = useGetShips();

  const handleSync = async() => {
    if (!prepareData) return;

    const res = await fetch('/api/vodohod/syncShips', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ships: prepareData }),
    });
  };

  useEffect(() => {
    if (ships) {
      console.log('ships', prepareShips(ships));
      setPrepareData(prepareShips(ships));
    }
  }, [ships]);

  return (
    <>
      <Stack direction="row" spacing={4} align="center">
        <Text fontSize="lg">Получить теплоходы от провайдера</Text>
        <Button colorScheme="yellow" onClick={getShips}>
          Получить
        </Button>
      </Stack>
      {ships && (
        <Stack direction="column" spacing={6}>
          <Stack direction="row" spacing={4} align="center">
            <Text fontSize="lg">
              Будет загружено: {ships?.length} теплоходов
            </Text>
            <Button colorScheme="green" onClick={handleSync}>
              Загрузить
            </Button>
          </Stack>
          <OrderedList spacing={0}>
            {ships.map(({ id, name }) => (
              <ListItem key={id}>{name}</ListItem>
            ))}
          </OrderedList>
        </Stack>
      )}
    </>
  );
};
