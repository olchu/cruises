import { CruiseType } from '@/shared/types/prismaResponse';
import {
  Box,
  Flex,
  HStack,
  Text,
  VStack,
  Link,
  Divider,
} from '@chakra-ui/react';
import moment from 'moment';
import NextLink from 'next/link';
import { FaShip, FaRoute, FaCalendarDays, FaSun } from 'react-icons/fa6';
import { useMemo } from 'react';

interface CreuseCardProps {
  cruise: CruiseType;
}

export const SimpleCardRow = ({ cruise }: CreuseCardProps) => {
  const {
    shipName,
    shortRoute,
    dateStart,
    dateEnd,
    days,
    minPrice,
    minDiscountPrice,
    image,
    shipImg,
    id,
    cityStart,
    cityEnd,
  } = cruise;
  const formatedStart = moment(dateStart);
  const formatedEnd = moment(dateEnd);

  const img = useMemo(() => image || shipImg || '', []);

  return (
    <>
      <HStack
        w={{ base: 'full' }}
        alignItems="stretch"
        color="blue"
        height="100%"
        bg="lightBlue"
        display="flex"
        flexDirection={{ base: 'column', lg: 'row' }}
      >
        <VStack w="full" gap="6px" alignItems="flex-start" p="8px">
          <Flex alignItems="center" fontSize="18px" fontWeight="bold">
            <Box w="25px" opacity={0.9}>
              <FaShip />
            </Box>
            <Text fontSize="18px" ml="14px">
              {shipName}
            </Text>
          </Flex>

          <Flex alignItems="center" fontSize="18px">
            <Box w="25px" opacity={0.9}>
              <FaRoute />
            </Box>
            <Text title={shortRoute} fontSize="12px" ml="14px">
              {cityStart} → {cityEnd}
            </Text>
          </Flex>

          <Flex alignItems="center" fontSize="18px">
            <Box w="25px" opacity={0.9}>
              <FaCalendarDays />
            </Box>
            <Text fontSize="16px" ml="14px">
              {formatedStart.format('DD.MM.YYYY')} -{' '}
              {formatedEnd.format('DD.MM.YYYY')}
            </Text>
          </Flex>

          <Flex alignItems="center" fontSize="18px">
            <Box w="25px" opacity={0.9}>
              <FaSun />
            </Box>
            <Text fontSize="16px" ml="14px">
              Дней: {days}
            </Text>
          </Flex>
          <HStack alignItems="flex-end" justifyContent="space-between" w="full">
            <Box>
              <Text color="accent" fontWeight="bold" fontSize="16px">
                от{' '}
                <Text fontSize="18px" as="span">
                  {(minDiscountPrice / 100)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
                </Text>{' '}
                {cruise.shipId === 101 ? ' EUR/чел ' : 'руб./чел'}
              </Text>
              {minPrice && minPrice !== minDiscountPrice && (
                <Text fontSize="12px" fontWeight="normal">
                  без скидки{' '}
                  <Text as="span" textDecoration="line-through">
                    {(minPrice / 100)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}{' '}
                    {cruise.shipId === 101 ? ' EUR/чел ' : 'руб./чел'}
                  </Text>
                </Text>
              )}
            </Box>
            <Link
              bg="accent"
              color="white"
              fontWeight="bold"
              fontSize="14px"
              as={NextLink}
              p="8px 12px"
              href={`/cruise/${id}`}
              alignItems="center"
              justifyContent="center"
              display="flex"
              _hover={{ textDecoration: 'none' }}
            >
              Выбрать каюты
            </Link>
          </HStack>
        </VStack>
      </HStack>
      <Divider />
    </>
  );
};
