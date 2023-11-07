import { WhiteTransparent } from '@/entities/whiteTransparent/WhiteTransparent';
import {
  HStack,
  InputGroup,
  InputLeftElement,
  Input,
  InputRightElement,
  Button,
  Text,
} from '@chakra-ui/react';
import { SearchBarInput } from './SearchBarInput';
import { BiCalendar } from 'react-icons/bi';
import { IoLocationSharp } from 'react-icons/io5';

export const SearchBar = () => {
  return (
    <WhiteTransparent p="12px" display="flex" flexDirection="column" alignItems="flex-end">
      <HStack gap="12px">
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
        <Button w="200px" bg="accent" color="white">
          Поиск
        </Button>
      </HStack>
      <Text color="accent">расширенный поиск</Text>
    </WhiteTransparent>
  );
};
