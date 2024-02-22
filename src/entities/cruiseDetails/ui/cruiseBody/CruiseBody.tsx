import { DBRouteType } from '@/shared/types/dbCruisesType';
import { CruiseType } from '@/shared/types/prismaResponse';
import { MainContainer } from '@/shared/ui/mainContainer/MainContainer';
import {
  HStack,
  Heading,
  Box,
  Link,
  Text,
  Stack,
  VStack,
  Button,
} from '@chakra-ui/react';
import { useState } from 'react';
import { CruiseCabinType } from './CruiseCabinType';
import { CruiseRoute } from './CruiseRoute';

const menu = [
  { title: 'Описание', link: '#about' },
  { title: 'Цены', link: '#price' },
  { title: 'Маршрут и экскурсии', link: '#route' },
  { title: 'Теплоход', link: '#ship' },
];

export type CabinType = {
  name: string;
  price: Price;
};

type PriceType = {
  name: string;
  cabinsType: CabinType[];
  hasPrice: boolean;
}[];

type Price = {
  val: number;
  dicountedVal: number;
  annotation: string;
  description: string;
  thumbnails: string[];
};

type DeckPrice = Record<string, Price>;

type IncomingPrices = Record<string, DeckPrice>;

export const CruiseBody = ({ cruise }: { cruise: CruiseType | null }) => {
  const incomingPrices = cruise?.prices! as IncomingPrices;
  console.log('incomingPrices', incomingPrices);
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

  const [isExpandedInfo, setIsExpandedInfo] = useState(false);

  return (
    <Box position="relative" w="full">
      <Box
        as="header"
        w="full"
        bg="blue"
        color="white"
        position="sticky"
        top={0}
        boxShadow="md"
        zIndex={1}
      >
        <HStack as={MainContainer} h="50px">
          {menu.map(({ title, link }) => {
            return (
              <Link href={link} flex="1" key={title} textAlign="center">
                {title}
              </Link>
            );
          })}
        </HStack>
      </Box>

      <MainContainer
        p={{ base: 'section.mobile', md: 'section.desktop' }}
        position="relative"
      >
        <Heading id="about" size="xl" mb="30px">
          Описание
        </Heading>
        <Stack
          direction={{ base: 'column', lg: 'row' }}
          gap="20px"
          overflow="hidden"
          maxH={!isExpandedInfo ? '320px' : 'inherit'}
        >
          {cruise?.restaurants && (
            <Box>
              <Heading fontSize="22px" mb="20px">
                Питание в круизе
              </Heading>
              <Box
                className="cruiseKitchen"
                dangerouslySetInnerHTML={{
                  __html: cruise?.restaurants || '',
                }}
              />
            </Box>
          )}
          <Box>
            <Heading fontSize="22px" mb="20px">
              Что включено в стоимость
            </Heading>

            <Text fontWeight="400" mb="14px" fontSize="16px">
              В стоимость тура входит:
            </Text>

            <Box
              className="cruiseAbout"
              dangerouslySetInnerHTML={{
                __html: cruise?.included || '',
              }}
            />

            <Text fontWeight="400" mt="20px" mb="14px" fontSize="16px">
              В стоимость тура не входит:
            </Text>
            <Box
              className="cruiseAbout"
              dangerouslySetInnerHTML={{ __html: cruise?.excluded || '' }}
            />
          </Box>
        </Stack>
        <Box
          w="full"
          h={isExpandedInfo ? '0' : '40px'}
          bg="linear-gradient(0deg, rgba(255,255,255,1) 30%, rgba(255,255,255,0.0046612394957983305) 100%)"
          position="absolute"
          bottom={{ base: 'section.mobile', md: 62 }}
        />
        <Button
          size="sm"
          color="primary"
          mt="12px"
          onClick={() => setIsExpandedInfo(!isExpandedInfo)}
        >
          раскрыть
        </Button>
      </MainContainer>

      <MainContainer p={{ base: 'section.mobile', md: 'section.desktop' }}>
        <Heading id="price" size="xl" mb="30px">
          Цены
        </Heading>
        {decks
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
                    return <CruiseCabinType key={cabin.name} cabin={cabin} />;
                  })}
                </VStack>
              </Box>
            );
          })}
      </MainContainer>

      <CruiseRoute route={cruise?.route as DBRouteType} />
    </Box>
  );
};
