'use client';

import { CruiseCardRow } from '@/entities/cruiseCardRow';
import { CruisesTable } from '@/entities/cruisesTable';
import { NoCruiseFound } from '@/entities/noCruiseFound';
import { SimpleCardRow } from '@/entities/simpleCardRow';
import { defaultItemsOnPage } from '@/shared/constants/constants';
import { CruiseType } from '@/shared/types/prismaResponse';
import {
  Spinner,
  VStack,
  HStack,
  Spacer,
  Switch,
  Button,
  Text,
  useMediaQuery,
} from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { IoMdRepeat } from 'react-icons/io';

type SearchResultContentProps = {
  handleGetMore: () => void;
  isLoading: boolean;
  isFetching: boolean;
  cruises: CruiseType[];
  cruisesCount: number;
  itemsOnPage?: number;
};

export const SearchResultContent = ({
  handleGetMore,
  isLoading,
  cruises,
  cruisesCount,
  isFetching,
  itemsOnPage = defaultItemsOnPage,
}: SearchResultContentProps) => {
  const [isShowTable, setIsShowTable] = useState(false);
  const [isLargerThan800] = useMediaQuery('(min-width: 800px)');

  const btnText = useMemo(() => {
    if (cruises.length === 0) return '';

    const difrent = cruisesCount - cruises.length;

    return `Показать еще ${difrent > itemsOnPage ? itemsOnPage : difrent}`;
  }, [cruises, cruisesCount]);

  return isLoading ? (
    <VStack
      w="full"
      h="full"
      alignItems="center"
      alignSelf="center"
      justifyContent="center"
      // p={{ base: '12px', lg: '18px' }}
    >
      <Spinner size="lg" />
    </VStack>
  ) : (
    <VStack
      w="full"
      alignItems="flex-start"
      // p={{ base: '12px', lg: '18px' }}
      gap="20px"
    >
      {cruises?.length === 0 ? (
        <NoCruiseFound />
      ) : (
        <HStack w="full">
          <Text>
            Найдено <b>{cruisesCount}</b> круизов
          </Text>
          <Spacer />
          <Text as="span">Показать таблицей</Text>
          <Switch
            colorScheme="prime"
            id="tableShow"
            isChecked={isShowTable}
            onChange={() => {
              setIsShowTable(!isShowTable);
            }}
          />
        </HStack>
      )}
      {isShowTable ? (
        isLargerThan800 ? (
          <CruisesTable cruises={cruises} />
        ) : (
          <VStack gap="12px" w="full">
            {cruises.map((cruise) => (
              <SimpleCardRow key={cruise.id} cruise={cruise} />
            ))}
          </VStack>
        )
      ) : (
        cruises?.map((cruise) => {
          return <CruiseCardRow cruise={cruise} key={cruise.id} />;
        })
      )}

      {cruisesCount - cruises.length > 0 && (
        <Button
          onClick={handleGetMore}
          color="primary"
          variant="outline"
          isLoading={isFetching}
          margin="0 auto"
        >
          <Text as="span" mr="8px">
            <IoMdRepeat />
          </Text>
          {btnText}
        </Button>
      )}
    </VStack>
  );
};
