'use client';

import { BoxProps, Select, Text, VStack } from '@chakra-ui/react';
import { FC, JSXElementConstructor, ReactElement } from 'react';

export const SearchBarSelect: FC<
  BoxProps & {
    icon: ReactElement<any, string | JSXElementConstructor<any>>;
    placeholder: string;
  }
> = ({ children, icon, placeholder }) => {
  return (
    <VStack alignItems="flex-start" gap="12px" w="full">
      <Text color={{ base: 'primary', lg: 'white' }}>{placeholder}</Text>
      <Select
        icon={icon}
        placeholder={placeholder}
        borderRadius="none"
        bg="white"
        w="full"
        color="text"
        _placeholder={{ color: 'text' }}
        iconSize="16px"
        minW={{ lg: '160px' }}
        variant="filled"
        _hover={{ background: 'white' }}
        _focusVisible={{ boxShadow: 'none', borderColor: 'inherit' }}
      >
        {children}
      </Select>
    </VStack>
  );
};
