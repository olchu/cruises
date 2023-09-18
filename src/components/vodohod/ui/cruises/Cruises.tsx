import { ShipsDataType } from '@/pages/admin/vodohod';
import {
  Box,
  Button,
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
import { getCruiseList } from '../../api/getCruiseList';
import { useGetToken } from '../../api/useGetToken';
import { DBCruiseData } from './utils/getCruiseInfo';

type DataTypeItem = {
  isLoading: boolean;
  cruises: DBCruiseData[];
  cruisesCount: number;
};

type DataType = Record<number, DataTypeItem>;

export const Cruises = ({ ships }: { ships: ShipsDataType[] }) => {
  const [data, setData] = useState<DataType>({});
  const { getToken, token } = useGetToken();

  useEffect(() => {
    if (token) return;
    getToken();
  }, [token]);

  useEffect(() => {
    // console.log('data', data);
  }, [data]);

  const setIsLoadingTrue = (id: number) => {
    setData((prevSate) => {
      return { ...prevSate, [id]: { ...prevSate[id], isLoading: true } };
    });
  };

  const handleGetCruise = async (extId: number, id: number) => {
    setIsLoadingTrue(extId);
    if (token) {
      const data = await getCruiseList(extId, id, token);
      setData((prevSate) => {
        return {
          ...prevSate,
          [extId]: {
            ...prevSate[extId],
            isLoading: false,
            cruises: data?.preparedData || [],
            cruisesCount: data?.count || 0,
          },
        };
      });
    }
  };

  const handleGetCruiseList = () => {
    ships.forEach((item) => {
      handleGetCruise(item.extId, item.id);
    });
  };

  const handleSync = async () => {
    let cruises: DBCruiseData[] = [];
    for (let key in data) {
      cruises = [...cruises.concat(data[key].cruises)];
    }

    const res = await fetch('/api/vodohod/syncCruises', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cruises }),
    });

    const responce = await res.json();

    console.log('responce', responce);
  };

  return (
    <>
      <Stack
        direction={['column', 'row']}
        alignItems="center"
        spacing={4}
        mb="8"
      >
        <Text>Загрузить круизы из Водохода</Text>
        <Button
          onClick={handleGetCruiseList}
          colorScheme="yellow"
          // isLoading={isFetchingCruiseList}
        >
          Загрузить
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
                <Th>Кол-во круизов</Th>
                <Th>Загрузить</Th>
              </Tr>
            </Thead>
            <Tbody>
              {ships.map((ship) => {
                return (
                  <Tr key={ship.id}>
                    <Td>{ship.id}</Td>
                    <Td>{ship.extId}</Td>
                    <Td>{ship.name}</Td>
                    <Td>{data[ship.extId]?.cruisesCount || 'не загружено'}</Td>
                    <Td>
                      <Button
                        colorScheme="yellow"
                        size="xs"
                        onClick={() => handleGetCruise(ship.extId, ship.id)}
                        isLoading={data[ship.extId]?.isLoading}
                      >
                        загрузить
                      </Button>
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
