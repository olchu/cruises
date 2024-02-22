import {
  Text,
  Box,
  Stack,
  VStack,
  HStack,
  Link,
  Button,
} from '@chakra-ui/react';
import { useState } from 'react';
import { CabinType } from './CruiseBody';
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

export const CruiseCabinType = ({ cabin }: { cabin: CabinType }) => {
  const { name, price } = cabin;
  const { annotation, description, thumbnails, dicountedVal, val } = price;

  const handleSend = () => {
    fetch('/api/sendEmail');
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
      </VStack>

      <Box>
        {/* <Text>Цена: </Text> */}
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
          //   href={`#price`}
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
