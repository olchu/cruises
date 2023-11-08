import { Container, ContainerProps } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';

export const MainContainer: FC<ContainerProps> = (props) => {
  const { children } = props;
  return (
    <Container maxW="1400px" p={0} {...props}>
      {children}
    </Container>
  );
};
