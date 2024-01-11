import { VStack, Spinner, SpinnerProps } from '@chakra-ui/react';
import { FC } from 'react';

export const Loading: FC<SpinnerProps> = (props) => {
  return (
    <VStack
      w="full"
      h="full"
      alignItems="center"
      alignSelf="center"
      justifyContent="center"
      p={{ base: '12px', lg: '18px' }}
    >
      <Spinner {...props} />
    </VStack>
  );
};
