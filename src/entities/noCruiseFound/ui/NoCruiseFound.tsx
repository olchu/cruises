import { VStack, Text } from '@chakra-ui/react';
import { TbShipOff } from 'react-icons/tb';

export const NoCruiseFound = () => {
  return (
    <VStack w="full">
      <Text fontSize="80px" color="primary" opacity={0.2}>
        <TbShipOff />
      </Text>
      <Text
        fontWeight="600"
        fontSize="30px"
        textAlign="center"
        opacity={0.2}
        color="primary"
      >
        Мы не нашли круизы по Вашему запросу.
        <br />
        Попробуйте изменить параметры поиска
      </Text>
    </VStack>
  );
};
