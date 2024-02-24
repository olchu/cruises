import {
  Text,
  Box,
  Stack,
  VStack,
  HStack, Button
} from '@chakra-ui/react';
import { useState } from 'react';
import { CabinType } from '../../type/cruisePrices';
import './style.css';

const Description = ({ description }: { description: string }) => {
  const [isShow, setShow] = useState(false);
  return (
    <>
      <Button variant="link" size="sm" onClick={() => setShow(!isShow)}>
        Подробнее
      </Button>
      {isShow && (
        <Box
          className="cabinDescription"
          dangerouslySetInnerHTML={{
            __html: description || '',
          }}
        />
      )}
    </>
  );
};

export const CruiseCabinType = ({
  cabin,
  freeCabins,
  chooseCabins,
  handleChoose,
  openOrder,
}: {
  cabin: CabinType;
  freeCabins: string[];
  chooseCabins: string[];
  handleChoose: (v: string) => void;
  openOrder: () => void;
}) => {
  const { name, price } = cabin;
  const { annotation, description, thumbnails, dicountedVal, val } = price;

  const handleSend = () => {
    openOrder();
  };

  return (
    <Stack
      direction={{ base: 'column', md: 'row' }}
      gap="20px"
      border="1px"
      borderColor="blueGrey"
      boxShadow="xs"
      w="full"
      p="12px"
    >
      {thumbnails?.[0] && (
        <Box
          bgImage={thumbnails?.[0]}
          bgPosition="center"
          bgSize="cover"
          w="200px"
          h="100px"
          flexShrink={0}
        />
      )}
      <VStack alignItems="flex-start" flex="1">
        <VStack alignItems="flex-start">
          <Text fontWeight="bold"> {name}</Text>
          <Text> {annotation}</Text>
        </VStack>
        {description && <Description description={description} />}

        {freeCabins && (
          <HStack fontSize="14px" flexWrap="wrap">
            <Text>Свободные каюты: </Text>
            {freeCabins.map((item) => {
              return (
                <Text
                  key={item}
                  px="4px"
                  py="2px"
                  background={
                    chooseCabins.includes(item) ? 'success' : 'inherit'
                  }
                  _hover={{
                    cursor: 'pointer',
                    fontWeight: 'bold',
                  }}
                  onClick={() => handleChoose(item)}
                >
                  {item}
                </Text>
              );
            })}
          </HStack>
        )}
      </VStack>

      <Box>
        <Text color="accent" fontWeight="bold" fontSize="16px">
          от{' '}
          <Text fontSize="18px" as="span">
            {(dicountedVal / 100)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
          </Text>{' '}
          руб./чел
        </Text>

        {dicountedVal !== val && (
          <Text
            fontSize="12px"
            fontWeight="normal"
            textDecoration="line-through"
          >
            без скидки{' '}
            <Text as="span">
              {(val / 100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}{' '}
              руб./чел
            </Text>
          </Text>
        )}

        <Button
          bg="accent"
          color="white"
          size="sm"
          fontWeight="bold"
          mt="12px"
          onClick={handleSend}
          alignItems="center"
          justifyContent="center"
          display="flex"
          _hover={{ textDecoration: 'none' }}
        >
          Забронировать
        </Button>
      </Box>
    </Stack>
  );
};
