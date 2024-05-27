import { CruiseContext } from '@/pages/cruise/[cruiseId]';
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
import { CruisePrices } from './CruisePrices';

const menu = [
  { title: 'Описание', link: '#about' },
  { title: 'Цены', link: '#price' },
  { title: 'Маршрут и экскурсии', link: '#route' },
  { title: 'Теплоход', link: '#ship' },
];

export const CruiseBody = () => {
  const { cruise } = useContext(CruiseContext);
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
        {(cruise?.included || cruise?.excluded || cruise?.restaurants) && (
          <>
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
                {cruise?.included && (
                  <Box
                    className="cruiseAbout"
                    dangerouslySetInnerHTML={{
                      __html: cruise?.included || '',
                    }}
                  />
                )}

                {cruise?.excluded && (
                  <>
                    <Text fontWeight="400" mt="20px" mb="14px" fontSize="16px">
                      В стоимость тура не входит:
                    </Text>
                    <Box
                      className="cruiseAbout"
                      dangerouslySetInnerHTML={{
                        __html: cruise?.excluded || '',
                      }}
                    />
                  </>
                )}
              </Box>
            </Stack>
            <Box
              w="full"
              h={isExpandedInfo ? '0' : '40px'}
              bg="linear-gradient(0deg, rgba(255,255,255,1) 30%, rgba(255,255,255,0.0046612394957983305) 100%)"
              position="absolute"
              bottom={{ base: 10, md: 62 }}
              left={{ base: 0, md: 0 }}
            />
            <Button
              size="sm"
              color="primary"
              mt="12px"
              onClick={() => setIsExpandedInfo(!isExpandedInfo)}
            >
              Подробнее
            </Button>
          </>
        )}
      </MainContainer>

      <CruisePrices shipId={cruise?.shipId || 1} />

      {/* <CruiseRoute route={cruise?.route as DBRouteType} /> */}
    </Box>
  );
};
