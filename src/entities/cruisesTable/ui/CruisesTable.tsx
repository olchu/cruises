import { CruiseType } from '@/shared/types/prismaResponse';
import { Table, Thead, Tr, Th, Tbody, Td, Link } from '@chakra-ui/react';
import moment from 'moment';
import NextLink from 'next/link';

export const CruisesTable = ({ cruises }: { cruises: CruiseType[] }) => {
  return (
    <Table variant="striped" colorScheme="gray" size="sm">
      <Thead position="sticky" top={0}>
        <Tr>
          <Th>Даты</Th>
          <Th>Дней</Th>
          <Th>Теплоход</Th>
          <Th>Маршрут</Th>
          <Th>Стоимость от</Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {cruises?.map((cruise) => {
          const formatedStart = moment(cruise.dateStart);
          const formatedEnd = moment(cruise.dateEnd);
          return (
            <Tr key={cruise.id}>
              <Td>
                {formatedStart.format('DD.MM.YYYY')} -{' '}
                {formatedEnd.format('DD.MM.YYYY')}
              </Td>
              <Td>{cruise.days}</Td>
              <Td>{cruise.shipName}</Td>
              <Td>
                <p style={{ fontSize: '12px' }}>{cruise.shortRoute}</p>
              </Td>
              <Td flex="1">
                {(cruise.minDiscountPrice / 100)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}{' '}
                <span style={{ fontSize: '12px' }}>
                  {cruise.shipId === 101 ? ' EUR/чел ' : 'руб./чел'}
                </span>
              </Td>
              <Td>
                <Link
                  bg="accent"
                  color="white"
                  fontWeight="bold"
                  fontSize="14px"
                  as={NextLink}
                  p="8px 12px"
                  href={`/cruise/${cruise.id}`}
                  alignItems="center"
                  justifyContent="center"
                  display="flex"
                  _hover={{ textDecoration: 'none' }}
                  className="noWrap"
                >
                  Выбрать каюты
                </Link>
              </Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};
