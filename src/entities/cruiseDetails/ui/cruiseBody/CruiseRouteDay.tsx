import { DBInfoRouteType } from '@/shared/types/dbCruisesType';

export const CruiseRouteDay = ({ day }: { day: DBInfoRouteType }) => {
  return (
    <div>
      <p>{day.city}</p>
      <p>{day.dateIn}</p>
      <p>{day.dateOut}</p>
      <p>{day.annotation}</p>
    </div>
  );
};
