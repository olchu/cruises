import { CruiseType, ShipsType } from '@/shared/types/prismaResponse';
import { VStack, Button } from '@chakra-ui/react';
import { Search } from '@/features/search';

// TODO to refactor, add store

type AsideSearchPanelProps = {
  handleSearch: () => void;
  isLoading: boolean;
  ships: ShipsType[];
  citiesStart: string[];
  citiesEnd: string[];
};

export const AsideSearchPanel = ({
  handleSearch,
  isLoading,
  ships,
  citiesStart,
  citiesEnd,
}: AsideSearchPanelProps) => {
  return (
    <VStack
      width="350px"
      position="sticky"
      bg="white"
      top="0"
      alignItems="flex-start"
      p={{ base: '12px', lg: '18px' }}
      shadow="md"
      height="550px"
      gap="18px"
    >
      <Search ships={ships} citiesStart={citiesStart} citiesEnd={citiesEnd} />
      <Button
        onClick={handleSearch}
        w="100%"
        bg="primary"
        color="white"
        isLoading={isLoading}
      >
        Поиск
      </Button>
    </VStack>
  );
};
