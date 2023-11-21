import { HeadingProps, Heading as HeadingCU } from '@chakra-ui/react';
import { FC } from 'react';

export const Heading: FC<HeadingProps> = ({ children, ...props }) => {
  return (
    <HeadingCU
      as="h2"
      size={{ base: 'md', lg: 'xl' }}
      textAlign="center"
      mb={{ base: '30px', lg: '60px' }}
      color="primary"
      {...props}
    >
      {children}
    </HeadingCU>
  );
};
