import { DBInfoRouteType } from '@/shared/types/dbCruisesType';
import { Box, Text } from '@chakra-ui/react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { CruiseExcursions } from './CruiseExcursions';

export const CruiseRouteDay = ({ day }: { day: DBInfoRouteType }) => {
  const dateIn = format(day.dateIn, 'dd MMMM', {
    locale: ru,
  });

  const timeIn = format(day.dateIn, 'HH:mm', {
    locale: ru,
  });

  const dateOut = format(day.dateOut, 'dd MMMM', {
    locale: ru,
  });

  const timeOut = format(day.dateOut, 'HH:mm', {
    locale: ru,
  });

  return (
    <Box mb="12px" px="12px" py="6px">
      <Box display="flex">
        <Text color="primary" fontWeight="bold">
          {day.city}
        </Text>
        <Text as="span" ml="12px">
          {timeIn}-{timeOut}
        </Text>
      </Box>
      {day?.annotation && (
        <Box
          color="grey"
          className="rmStyle"
          dangerouslySetInnerHTML={{
            __html: day?.annotation || '',
          }}
        />
      )}
      {day?.excursions.length>0 && (
        <>
          <Text fontSize="16px">Экскурсии</Text>
          <Box display="flex" gap="12px" flexWrap="wrap">
            {day.excursions.length > 1 ? (
              day.excursions.map((item) => (
                <CruiseExcursions key={item.name} excursion={item} />
              ))
            ) : (
              <CruiseExcursions excursion={day.excursions[0]} />
            )}
          </Box>
        </>
      )}
    </Box>
  );
};
