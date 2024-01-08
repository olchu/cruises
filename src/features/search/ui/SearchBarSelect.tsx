'use client';

import { BoxProps, Select, Text, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import {
  ChangeEvent,
  FC,
  JSXElementConstructor,
  ReactElement,
  useState,
} from 'react';

export const SearchBarSelect: FC<
  BoxProps & {
    icon: ReactElement<any, string | JSXElementConstructor<any>>;
    placeholder: string;
    searchParamName: 'cityFrom' | 'cityEnd' | 'ship';
  }
> = ({ children, icon, placeholder, searchParamName }) => {
  const [value, setValue] = useState<string | number>('');
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const val = e.currentTarget.value;
    setValue(val);
    if (val !== placeholder) {
      router.query = { ...router.query, [searchParamName]: val };
    }
  };
  return (
    <VStack alignItems="flex-start" gap="12px" w="full">
      <Text color={{ base: 'primary', lg: 'white' }}>{placeholder}</Text>
      <Select
        icon={icon}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        borderRadius="none"
        bg="white"
        w="full"
        color="text"
        _placeholder={{ color: 'text' }}
        iconSize="16px"
        minW={{ lg: '160px' }}
        border="1px solid"
        borderColor="inherit"
        variant="filled"
        _hover={{ background: 'white' }}
        _focusVisible={{ boxShadow: 'none', borderColor: 'inherit' }}
      >
        {children}
      </Select>
    </VStack>
  );
};
