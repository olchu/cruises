'use client';

import { WhiteTransparent } from '@/shared/ui/whiteTransparent/WhiteTransparent';
import { HStack, Button, Text, Flex, BoxProps } from '@chakra-ui/react';
import { SearchBarInput } from './SearchBarInput';
import { BiCalendar } from 'react-icons/bi';
import { IoLocationSharp } from 'react-icons/io5';
import { FC } from 'react';
import { useSearchParams } from 'next/navigation';
import { SearchBarInputDate } from './SearchBarInputDate';

export const SearchBar: FC<BoxProps> = (props) => {
  const searchParams = useSearchParams();

  console.log('searchParametrs', searchParams?.get('id'));
  return (
    <WhiteTransparent
      p={{ base: 'section.mobile', lg: '12px' }}
      display="flex"
      flexDirection="column"
      alignItems="flex-end"
      w={{ base: '100%', lg: 'auto' }}
      {...props}
    >
      <Flex
        gap={{ base: '20px' }}
        flexDirection={{ base: 'column', lg: 'row' }}
        w="100%"
      >
        <SearchBarInputDate placeholder="Отправление" />
        <SearchBarInput placeholder="Прибытие" icon={<BiCalendar />} />
        <SearchBarInput placeholder="От куда" icon={<IoLocationSharp />} />
        <SearchBarInput placeholder="Куда" icon={<IoLocationSharp />} />
        <Button w="100%" bg="accent" color="white">
          Поиск
        </Button>
      </Flex>
      <Text color="accent" mt="12px" fontWeight="bold">
        расширенный поиск
      </Text>
    </WhiteTransparent>
  );
};
