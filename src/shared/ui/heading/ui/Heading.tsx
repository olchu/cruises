import { HeadingProps, Heading as HeadingCU } from '@chakra-ui/react';
import { FC } from 'react';

export const Heading: FC<HeadingProps> = ({ children }) => {
  return (
    <HeadingCU
      as="h2"
      size={{ base: 'md', lg: 'xl' }}
      textAlign="center"
      mb={{ base: 'section.mobile', lg: 'section.desktop' }}
    >
      {children}
    </HeadingCU>
  );
};
