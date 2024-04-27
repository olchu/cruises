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
import { getCruiseList } from '../../api/getCruiseList';
import { useGetToken } from '../../api/useGetToken';
import { ImCheckmark } from 'react-icons/im';
import { useToast } from '@chakra-ui/react';
import { deleteUnusedCruise } from '../../api/deleteUnusedCruise';
import { DBCruiseData } from '@/shared/types/dbCruisesType';
import { Providers } from '@/shared/constants/providers';
import { ShipsType } from '@/shared/types/prismaResponse';

type DataTypeItem = {
  isLoading: boolean;
  isLoaded: boolean;
  cruises: DBCruiseData[];
  cruisesCount: number;
};

type DataType = Record<number, DataTypeItem>;

export const Cruises = ({ ships }: { ships: ShipsType[] }) => {
  const [data, setData] = useState<DataType>({});
  const { getToken, token } = useGetToken();
  const toast = useToast();

  useEffect(() => {
    if (token) return;
    getToken();
  }, [token]);

  const setIsLoadingTrue = (id: number) => {
    setData((prevSate) => {
      return { ...prevSate, [id]: { ...prevSate[id], isLoading: true } };
    });
  };

  const syncCruisesDB = async (cruises: DBCruiseData[]) => {
    const res = await fetch('/api/admin/syncCruises', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cruises, loadFrom: Providers.vodohod }),
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

  const handleSync = async (id: number) => {
    const { cruises } = data[id];
    syncCruisesDB(cruises);
  };

  const handleGetCruise = async (extId: number, id: number, index: number) => {
    setIsLoadingTrue(extId);
    if (token) {
      const data = await getCruiseList(extId, id, token, ships[index]);
      setData((prevSate) => {
        return {
          ...prevSate,
          [extId]: {
            ...prevSate[extId],
            isLoading: false,
            isLoaded: true,
            cruises: data?.preparedData || [],
            cruisesCount: data?.count || 0,
          },
        };
      });
    }
  };

  const handleGetCruiseList = async () => {
    for (let ship of ships) {
      if (!data[ship.extId]?.isLoaded) {
        // await setTimeout(() => handleGetCruise(ship.extId, ship.id), 5000);
      }
    }
  };

  const handleDel = async () => {
    const count = await deleteUnusedCruise();
    toast({
      title: 'Круизы удалены',
      description: 'Удалено ' + count + ' круизов',
      status: 'success',
      duration: 99999999,
      isClosable: true,
      position: 'bottom-right',
    });
  };

  const handleSyncAll = async () => {
    let cruises: DBCruiseData[] = [];
    for (let key in data) {
      cruises = [...cruises.concat(data[key].cruises)];
    }
    syncCruisesDB(cruises);
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
          // onClick={handleSyncAll}
          colorScheme="yellow"
          // isLoading={isFetchingCruiseList}
        >
          Синхранизировать
        </Button>
        <Button
          colorScheme="red"
          // isLoading={isFetchingCruiseList}
          onClick={handleDel}
        >
          Удалить старые
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
                <Th>
                  <Center alignItems="center">Синк</Center>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {ships.map((ship, index) => {
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
                            onClick={() =>
                              handleGetCruise(ship.extId, ship.id, index)
                            }
                            isLoading={data[ship.extId]?.isLoading}
                          >
                            загрузить
                          </Button>
                        )}
                      </Center>
                    </Td>
                    <Td>
                      <Center alignItems="center" color="green">
                        <Button
                          colorScheme="blue"
                          size="xs"
                          onClick={() => handleSync(ship.extId)}
                        >
                          синк
                        </Button>
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
