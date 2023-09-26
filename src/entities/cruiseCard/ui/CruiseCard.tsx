import { CruiseType } from '@/shared/types/prismaResponse';
import { Box, Button, HStack, Image, Text, VStack } from '@chakra-ui/react';
import moment from 'moment';
import NextImage from 'next/image';

interface CreuseCardProps {
  cruise: CruiseType;
}

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
  } = cruise;
  const formatedStart = moment(dateStart);
  const formatedEnd = moment(dateEnd);

  return (
    <VStack w="370px" h="450px">
      <Box w="100%" h="190px" bg="">
        <Image boxSize="100%" objectFit="cover" src={image} alt="Dan Abramov" />
      </Box>
      <Text>{shipName}</Text>
      <Text>{shortRoute}</Text>
      <Text>{formatedEnd.diff(formatedStart, 'days')}</Text>
      <Text>{formatedStart.format('DD.MM.YYYY')}</Text>
      <Text>{formatedEnd.format('DD.MM.YYYY')}</Text>
      <HStack>
        <Box>
          <Text>{minPrice}</Text>
          <Text>{minDiscountPrice}</Text>
        </Box>
        <Button>Подробнее</Button>
      </HStack>
    </VStack>
  );
};
