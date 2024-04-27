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
import { useState } from 'react';
import { ImCheckmark } from 'react-icons/im';
import { useToast } from '@chakra-ui/react';
import { DBCruiseData } from '@/shared/types/dbCruisesType';
import { getCruisesByShip } from '../../api/getCruisesByShip';
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

  const setIsLoadingTrue = (id: number) => {
    setData((prevSate) => {
      return { ...prevSate, [id]: { ...prevSate[id], isLoading: true } };
    });
  };

  const handleGetCruise = async (ship: ShipsType) => {
    const { extId, id } = ship;
    setIsLoadingTrue(extId);
    const cruises = await getCruisesByShip(extId, id, ship);
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

  const syncCruisesDB = async (cruises: DBCruiseData[]) => {
    const res = await fetch('/api/admin/syncCruises', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cruises, loadFrom: Providers.infoflot }),
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
        <Text>Загрузить круизы из Инфофлот</Text>
        <Button
          // onClick={handleGetCruiseList}
          colorScheme="yellow"
          // isLoading={isFetchingCruiseList}
        >
          Загрузить все
        </Button>
        <Button
          // onClick={handleSyncAll}
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
                <Th>
                  <Center alignItems="center">Синк</Center>
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
