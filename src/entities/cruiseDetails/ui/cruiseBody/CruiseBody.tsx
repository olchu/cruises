import { CruiseContext } from '@/pages/cruise/[cruiseId]';
import { DBRouteType } from '@/shared/types/dbCruisesType';
import { CruiseType, ShipsType } from '@/shared/types/prismaResponse';
import { MainContainer } from '@/shared/ui/mainContainer/MainContainer';
import {
  HStack,
  Heading,
  Box,
  Link,
  Text,
  Stack,
  Button,
} from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { IncomingPrices } from '../../type/cruisePrices';
import { useGetPricesInfoflot } from '../../utils/useGetPricesInfoflot';
import { CruisePrices } from './CruisePrices';
import { CruiseRoute } from './CruiseRoute';

const menu = [
  { title: 'Описание', link: '#about' },
  { title: 'Цены', link: '#price' },
  { title: 'Маршрут и экскурсии', link: '#route' },
  { title: 'Теплоход', link: '#ship' },
];

export const CruiseBody = () => {
  const { cruise } = useContext(CruiseContext);
  const [isExpandedInfo, setIsExpandedInfo] = useState(false);
  const { cabins, freeCabins } = useGetPricesInfoflot(cruise?.extId);

  // console.log('infoflot prices', cabins);
  // console.log('cruise prices', cruise?.prices);
  // console.log('freeCabins', freeCabins);

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

      <CruisePrices freeCabins={cabins} />

      <CruiseRoute route={cruise?.route as DBRouteType} />
    </Box>
  );
};
