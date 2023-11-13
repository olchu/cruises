import { WhiteTransparent } from '@/entities/whiteTransparent/WhiteTransparent';
import { HStack, Button, Text, Flex } from '@chakra-ui/react';
import { SearchBarInput } from './SearchBarInput';
import { BiCalendar } from 'react-icons/bi';
import { IoLocationSharp } from 'react-icons/io5';

export const SearchBar = () => {
  return (
    <WhiteTransparent
      p={{ base: '18px', lg: '12px' }}
      display="flex"
      flexDirection="column"
      alignItems="flex-end"
      w={{ base: '100%', md: '600px', lg: 'auto' }}
    >
      <Flex
        gap={{ base: '20px' }}
        flexDirection={{ base: 'column', lg: 'row' }}
        w="100%"
      >
        <SearchBarInput
          placeholder="Отправление"
          type="datetime"
          icon={<BiCalendar />}
        />
        <SearchBarInput
          placeholder="Прибытие"
          type="datetime"
          icon={<BiCalendar />}
        />
        <SearchBarInput placeholder="От куда" icon={<IoLocationSharp />} />
        <SearchBarInput placeholder="Куда" icon={<IoLocationSharp />} />
        <Button w="100%" bg="accent" color="white">
          Поиск
        </Button>
      </Flex>
      <Text color="accent">расширенный поиск</Text>
    </WhiteTransparent>
  );
};
