import { CruiseType } from '@/shared/types/prismaResponse';
import {
  Box,
  Flex,
  HStack,
  Text,
  VStack,
  Link,
  Spacer,
  Divider,
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import moment from 'moment';
import NextLink from 'next/link';
import { FaShip, FaRoute, FaCalendarDays, FaSun } from 'react-icons/fa6';
import { format, compareAsc } from 'date-fns';
import { ru } from 'date-fns/locale';
import Image from 'next/image';
import { useMemo } from 'react';

interface CreuseCardProps {
  cruise: CruiseType;
}

const Trunceted = styled(Flex)`
  color: red;
`;

export const CruiseCardRow = ({ cruise }: CreuseCardProps) => {
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
    title,
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
        <Box
          w={{ base: 'full', lg: '300px' }}
          minW={{ base: 'full', lg: '300px' }}
          height={{ base: '150px', lg: '220px' }}
          position="relative"
        >
          <Image
            fill
            src={img}
            alt={title}
            style={{ objectFit: 'cover' }}
            priority
          />
          <VStack
            position="absolute"
            left="0"
            bottom="0"
            w="full"
            h="full"
            zIndex={2}
            fontWeight="900"
            color="white"
            justifyContent="center"
            background="radial-gradient(circle, rgba(0,0,0,0.3) 20%, rgba(255,255,255,0) 90%)"
          >
            <Text fontSize="80px" lineHeight="80px">
              {format(dateStart, 'dd', {
                locale: ru,
              })}
            </Text>
            <Text fontSize="40px" lineHeight="40px">
              {format(dateStart, 'MMM', {
                locale: ru,
              }).replace('.', '')}
            </Text>
          </VStack>
        </Box>

        <VStack w="full" gap="10px" alignItems="flex-start" p="8px">
          <Flex alignItems="center" fontSize="20px" fontWeight="bold">
            <Box w="25px" opacity={0.9}>
              <FaShip />
            </Box>
            <Text fontSize="20px" ml="14px">
              {shipName}
            </Text>
          </Flex>

          <Flex alignItems="center" fontSize="20px">
            <Box w="25px" opacity={0.9}>
              <FaRoute />
            </Box>
            <Text title={shortRoute} fontSize="12px" ml="14px" noOfLines={3}>
              {shortRoute}
            </Text>
          </Flex>

          <Flex alignItems="center" fontSize="20px">
            <Box w="25px" opacity={0.9}>
              <FaCalendarDays />
            </Box>
            <Text fontSize="16px" ml="14px">
              {formatedStart.format('DD.MM.YYYY')} -{' '}
              {formatedEnd.format('DD.MM.YYYY')}
            </Text>
          </Flex>

          <Flex alignItems="center" fontSize="20px">
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
                <Text fontSize="24px" as="span">
                  {(minDiscountPrice / 100)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
                </Text>{' '}
                руб./чел
              </Text>
              {minPrice && minPrice !== minDiscountPrice && (
                <Text fontSize="12px" fontWeight="normal">
                  без скидки{' '}
                  <Text as="span" textDecoration="line-through">
                    {(minPrice / 100)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}{' '}
                    руб./чел
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
              Выбрать
            </Link>
          </HStack>
        </VStack>
      </HStack>
      <Divider />
    </>
  );
};
