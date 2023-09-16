import {
  CruiseDataType,
  useGetCruiseList,
} from '@/components/vodohod/api/useGetCruiseList';
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
type ShipDataType = {
  cruiseCount: number;
  cruises: CruiseDataType;
};

type HashData = Record<number, ShipDataType>;

export const Cruises = ({ ships }: { ships: ShipsDataType[] }) => {
  const hashData: HashData = {};

  const handleGetCruiseList = () => {
    ships.forEach((ship) => {
      getCruiseList(ship.extId);
    });
  };

  const handleSync = async () => {
    console.log('syncData');
  };

  return (
    <>
      <Stack
        direction={['column', 'row']}
        alignItems="center"
        spacing={4}
        mb="2"
      >
        <Text>Выгрузить круизы из Водохода</Text>
        <Button
          onClick={handleGetCruiseList}
          colorScheme="yellow"
          // isLoading={isFetchingCruiseList}
        >
          Загрузить круизы
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
                <Th>Цены к круизам</Th>
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
                      {cruiseData
                        ? cruiseData[ship.extId]?.count
                        : 'не загружено'}
                    </Td>
                    <Td>не загружено</Td>
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
