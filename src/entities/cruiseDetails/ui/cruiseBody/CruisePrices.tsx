import { OrderModal } from '@/features/orderModal';
import { CruiseContext } from '@/pages/cruise/[cruiseId]';
import { MainContainer } from '@/shared/ui/mainContainer/MainContainer';
import {
  HStack,
  Heading,
  Switch,
  VStack,
  Box,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { CabinType, IncomingPrices, PriceType } from '../../type/cruisePrices';
import { Schema } from '../schema/Schema';
import { CruiseCabinType } from './CruiseCabinType';

export const CruisePrices = () => {
  const [showSchema, setShowSchema] = useState(false);
  const [chooseCabins, setChooseCabins] = useState<string[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { cruise, cabins } = useContext(CruiseContext);

  const incomingPrices = cruise?.prices! as IncomingPrices;

  const handleChoose = (item: string) => {
    const index = chooseCabins.findIndex((el) => el === item);

    console.log('item', item);

    if (index >= 0) {
      setChooseCabins((prev) => {
        const cabins = [...prev];
        cabins.splice(index, 1);
        return cabins;
      });
    } else {
      setChooseCabins((prev) => {
        return [...prev, item];
      });
    }
  };

  const decks: PriceType = Object.keys(incomingPrices).map((deck) => {
    let cabinsByDeck = {
      name: deck,
      cabinsType: [] as CabinType[],
      hasPrice: false,
    };
    let hasPrice = false;
    const cabinsType: CabinType[] = Object.keys(incomingPrices[deck]!).map(
      (cabinsType) => {
        if (incomingPrices[deck][cabinsType]?.val) {
          hasPrice = true;
        }
        return {
          name: cabinsType,
          price: incomingPrices[deck][cabinsType],
        };
      }
    );
    cabinsByDeck.cabinsType = [...cabinsType];
    cabinsByDeck.hasPrice = hasPrice;

    return cabinsByDeck;
  });

  return (
    <MainContainer p={{ base: 'section.mobile', md: 'section.desktop' }}>
      <HStack alignItems="baseline" justifyContent="space-between">
        <Heading id="price" size="xl" mb="30px">
          Цены
        </Heading>

        <HStack mb="12px" gap="12px">
          <Text as="span">Режим выбора кают:</Text>

          <Text
            px="12px"
            py="12px"
            onClick={() => setShowSchema(false)}
            background={showSchema ? 'secondary' : 'blue'}
            color={showSchema ? 'inherit' : 'white'}
            as="button"
          >
            Таблица
          </Text>
          <Text
            as="button"
            px="12px"
            py="12px"
            onClick={() => setShowSchema(true)}
            background={showSchema ? 'blue' : 'secondary'}
            color={!showSchema ? 'inherit' : 'white'}
          >
            Схема палуб
          </Text>
        </HStack>
      </HStack>

      {showSchema && (
        <Schema
          handleChoose={handleChoose}
          chooseCabins={chooseCabins}
          orderOpen={onOpen}
        />
      )}

      {!showSchema &&
        decks
          .filter((item) => item.hasPrice)
          .map(({ cabinsType, name }) => {
            return (
              <Box key={name} mb="30px" _last={{ marginBottom: 0 }}>
                <Text
                  bg="blue"
                  p="12px"
                  mb="12px"
                  fontWeight="bold"
                  color="white"
                >
                  {name} палуба
                </Text>
                <VStack gap="20px" alignItems="flex-start" w="full">
                  {cabinsType.map((cabin) => {
                    return (
                      <CruiseCabinType
                        key={cabin.name}
                        cabin={cabin}
                        freeCabins={cabins ? cabins[name]?.[cabin?.name] : []}
                        handleChoose={handleChoose}
                        chooseCabins={chooseCabins}
                        openOrder={onOpen}
                      />
                    );
                  })}
                </VStack>
              </Box>
            );
          })}
      <OrderModal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        chooseCabins={chooseCabins}
        cruise={cruise}
      />
    </MainContainer>
  );
};
