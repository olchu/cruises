import { DBRouteType } from '@/shared/types/dbCruisesType';
import { MainContainer } from '@/shared/ui/mainContainer/MainContainer';
import { Heading } from '@chakra-ui/react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { CruiseRouteDay } from './CruiseRouteDay';

export const CruiseRoute = ({ route }: { route: DBRouteType }) => {
  console.log('route', route);

  const routes = Object.values(route);
  console.log('days', routes);
  return (
    <MainContainer p={{ base: 'section.mobile', md: 'section.desktop' }}>
      <Heading id="price" size="xl" mb="30px">
        Маршрут
      </Heading>

      {routes?.map((days, index) => {
        const startDate = format(days[0].dateIn * 1000, 'dd MMMM yyyy', {
          locale: ru,
        });
        const dayOfWeekStart = format(days[0].dateIn * 1000, 'EEEE', {
          locale: ru,
        });
        
        return (
          <div key={index}>
            День {index + 1}{' '}
            <span>
              {startDate} {dayOfWeekStart}
            </span>
            <div>
              {days.map((day, index) => {
                return <CruiseRouteDay key={index} day={day} />;
              })}
            </div>
          </div>
        );
      })}
    </MainContainer>
  );
};
