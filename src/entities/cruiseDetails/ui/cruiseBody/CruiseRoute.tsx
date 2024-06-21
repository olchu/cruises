import { DBRouteType } from '@/shared/types/dbCruisesType';
import { MainContainer } from '@/shared/ui/mainContainer/MainContainer';
import { Box, Heading, Text } from '@chakra-ui/react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { CruiseRouteDay } from './CruiseRouteDay';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import { Providers } from '@/shared/constants/providers';

export const CruiseRoute = ({
  route,
  provider,
}: {
  route: DBRouteType;
  provider: Providers;
}) => {
  const routes = Object.values(route);
  return (
    <MainContainer p={{ base: 'section.mobile', md: 'section.desktop' }}>
      <Heading id="price" size="xl" mb="30px">
        Маршрут
      </Heading>

      <Accordion defaultIndex={[0]} allowMultiple>
        {routes?.map((days, index) => {
          const dateIn = days[0].dateIn;
          console.log('dateIn', new Date(dateIn));

          const startDate = format(dateIn, 'dd.MM.yyyy', {
            locale: ru,
          });

          const startTime = format(dateIn, 'HH:mm');
          const dayOfWeekStart = format(dateIn, 'EEEE', {
            locale: ru,
          });

          return (
            <AccordionItem key={index}>
              <AccordionButton>
                <Box flex="1" textAlign="left" display="flex" gap="20px">
                  <Text
                    as="span"
                    fontSize="18px"
                    fontWeight="bold"
                    color="primary"
                  >
                    День {index + 1}{' '}
                  </Text>
                  <span>
                    {startDate}, {dayOfWeekStart}
                  </span>
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                {days.map((day, index) => {
                  return <CruiseRouteDay key={index} day={day} />;
                })}
              </AccordionPanel>
            </AccordionItem>
          );
        })}
      </Accordion>
    </MainContainer>
  );
};
