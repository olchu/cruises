import { Container } from '@chakra-ui/react';
import { ReactNode } from 'react';

export const MainContainer = ({
  children,
  as = 'div',
}: {
  children: ReactNode;
  as?: any;
}) => {
  return (
    <Container as={as} maxW="1400px" p={0}>
      {children}
    </Container>
  );
};
