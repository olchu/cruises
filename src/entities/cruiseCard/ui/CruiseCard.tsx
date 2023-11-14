import { CruiseType } from '@/shared/types/prismaResponse';
import {
  Box,
  Flex,
  HStack,
  Image,
  Text,
  VStack,
  Link,
  Spacer,
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import moment from 'moment';
import NextLink from 'next/link';
import { FaShip, FaRoute, FaCalendarDays, FaSun } from 'react-icons/fa6';

interface CreuseCardProps {
  cruise: CruiseType;
}

const Trunceted = styled(Flex)`
  color: red;
`;

export const CruiseCard = ({ cruise }: CreuseCardProps) => {
  const {
    shipName,
    shortRoute,
    dateStart,
    dateEnd,
    days,
    minPrice,
    minDiscountPrice,
    image,
    id,
    title,
  } = cruise;
  const formatedStart = moment(dateStart);
  const formatedEnd = moment(dateEnd);

  return (
    <VStack
      w={{ base: 'full', sm: '370px' }}
      alignItems="flex-start"
      color="blue"
      height="100%"
      bg="white"
    >
      <Box w="full" h="190px">
        <Image boxSize="100%" objectFit="cover" src={image} alt={title} />
      </Box>

      <VStack w="full" gap="10px" alignItems="flex-start" p="12px">
        <Flex alignItems="center" fontSize="25px" fontWeight="bold">
          <Box w="25px" opacity={0.9}>
            <FaShip />
          </Box>
          <Text fontSize="20px" ml="14px">
            {shipName}
          </Text>
        </Flex>

        <Flex alignItems="center" fontSize="25px">
          <Box w="25px" opacity={0.9}>
            <FaRoute />
          </Box>
          <Text title={shortRoute} fontSize="12px" ml="14px" noOfLines={3}>
            {shortRoute}
          </Text>
        </Flex>

        <Flex alignItems="center" fontSize="25px">
          <Box w="25px" opacity={0.9}>
            <FaCalendarDays />
          </Box>
          <Text fontSize="16px" ml="14px">
            {formatedStart.format('DD.MM.YYYY')} -{' '}
            {formatedEnd.format('DD.MM.YYYY')}
          </Text>
        </Flex>

        <Flex alignItems="center" fontSize="25px">
          <Box w="25px" opacity={0.9}>
            <FaSun />
          </Box>
          <Text fontSize="16px" ml="14px">
            Дней: {days}
          </Text>
        </Flex>
      </VStack>

      <Spacer />

      <HStack
        alignItems="flex-start"
        justifyContent="space-between"
        w="full"
        px="12px"
        pb="12px"
      >
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
          <Text fontSize="12px" fontWeight="normal">
            без скидки{' '}
            <Text as="span" textDecoration="line-through">
              {(minPrice / 100)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}{' '}
              руб./чел
            </Text>
          </Text>
        </Box>
        <Link
          bg="accent"
          color="white"
          fontWeight="bold"
          as={NextLink}
          h="50px"
          w="120px"
          href={`/cruise/${id}`}
          alignItems="center"
          justifyContent="center"
          display="flex"
          _hover={{ textDecoration: 'none' }}
        >
          Подробнее
        </Link>
      </HStack>
    </VStack>
  );
};
