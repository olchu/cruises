'use client';

import { WhiteTransparent } from '@/shared/ui/whiteTransparent/WhiteTransparent';
import { HStack, Button, Text, Flex, BoxProps, Select } from '@chakra-ui/react';
import { SearchBarInput } from './SearchBarInput';
import { BiCalendar } from 'react-icons/bi';
import { BiSolidShip } from 'react-icons/bi';
import { IoLocationSharp } from 'react-icons/io5';
import { FC } from 'react';
import { useSearchParams } from 'next/navigation';
import { SearchBarInputDate, urlParamNames } from './SearchBarInputDate';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const SearchBar: FC<BoxProps> = (props) => {
  const router = useRouter();

  const handleSearch = () => {
    console.log('search', window.location.search);
    router.push('/search' + window.location.search);
  };
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
        <SearchBarInputDate
          placeholder="Отправление"
          urlParamName={urlParamNames.dateStart}
        />
        <SearchBarInputDate
          placeholder="Прибытие"
          urlParamName={urlParamNames.dateEnd}
        />
        <Select
          icon={<BiSolidShip />}
          placeholder="Теплоход"
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
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </Select>
        <SearchBarInput placeholder="От куда" icon={<IoLocationSharp />} />
        <SearchBarInput placeholder="Куда" icon={<IoLocationSharp />} />
        <Button onClick={handleSearch} w="100%" bg="accent" color="white">
          Поиск
        </Button>
      </Flex>
      <Text color="accent" mt="12px" fontWeight="bold">
        расширенный поиск
      </Text>
    </WhiteTransparent>
  );
};
