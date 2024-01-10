'use client';

import { BoxProps, Button, Select, Text, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { relative } from 'path';
import {
  ChangeEvent,
  FC,
  JSXElementConstructor,
  ReactElement,
  useEffect,
  useState,
} from 'react';

export const SearchBarSelect: FC<
  BoxProps & {
    icon: ReactElement<any, string | JSXElementConstructor<any>>;
    placeholder: string;
    searchParamName: 'cityFrom' | 'cityEnd' | 'ship';
  }
> = ({ children, icon, placeholder, searchParamName }) => {
  const router = useRouter();
  const [value, setValue] = useState<string | number>(() => {
    if (!router.query[searchParamName]) return null;

    return router.query[searchParamName];
  });

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const val = e.currentTarget.value;
    const currentUrl = new URL(window.location.href);
    setValue(val);
    if (val) {
      currentUrl.searchParams.set(searchParamName, val);
      window.history.replaceState(null, '', currentUrl.toString());
    } else {
      currentUrl.searchParams.delete(searchParamName);
      window.history.replaceState(null, '', currentUrl.toString());
    }
  };

  return (
    <VStack alignItems="flex-start" gap="12px" w="full" position={'relative'}>
      <Text color={{ base: 'text' }}>{placeholder}</Text>
      <Select
        icon={(!value && icon) || <></>}
        placeholder="не важно"
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
      {value && (
        <Button size="sm" onClick={() => {}}>
          x
        </Button>
      )}
    </VStack>
  );
};
