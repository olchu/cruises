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
} from '@chakra-ui/react';
import { CruiseCabinType } from './CruiseCabinType';

const menu = [
  { title: 'Описание', link: '#about' },
  { title: 'Цены', link: '#price' },
  { title: 'Маршрут и экскурсии', link: '#route' },
  { title: 'Теплоход', link: '#ship' },
];

export type CabinType = {
  name: string;
  price: {
    val: number;
    dicountedVal: number;
    annotation: string;
    description: string;
    thumbnails: string[];
  };
};

type PriceType = {
  name: string;
  cabinsType: CabinType[];
  hasPrice: boolean;
}[];

export const CruiseBody = ({ cruise }: { cruise: CruiseType | null }) => {
  const incomingPrices = cruise?.prices!;
  console.log('incomingPrices', incomingPrices);
  const decs = Object.keys(incomingPrices);
  const decks: PriceType = Object.keys(incomingPrices).map((deck) => {
    let cabinsByDeck = {
      name: deck,
      cabinsType: [],
      hasPrice: false,
    };
    let hasPrice = false;
    const cabinsType = Object.keys(incomingPrices[deck]!).map((cabinsType) => {
      if (incomingPrices[deck][cabinsType]?.val) {
        hasPrice = true;
      }
      return {
        name: cabinsType,
        price: incomingPrices[deck][cabinsType],
      };
    });
    cabinsByDeck.cabinsType = [...cabinsType];
    cabinsByDeck.hasPrice = hasPrice;

    return cabinsByDeck;
  });

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

      <MainContainer p={{ base: 'section.mobile', md: 'section.desktop' }}>
        <Heading id="about" size="xl" mb="30px">
          Описание
        </Heading>
        <Stack direction={{ base: 'column', lg: 'row' }} gap="20px">
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
      </MainContainer>

      <MainContainer p={{ base: 'section.mobile', md: 'section.desktop' }}>
        <Heading id="price" size="xl" mb="30px">
          Цены
        </Heading>
        {decks
          .filter((item) => item.hasPrice)
          .map(({ cabinsType, name }) => {
            return (
              <Box key={name} mb="30px">
                <Text bg="blueGrey" p="12px" mb="12px" fontWeight="bold">
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
    </Box>
  );
};
