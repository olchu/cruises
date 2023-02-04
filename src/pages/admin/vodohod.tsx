import AdminLayout from '@/components/layouts/admin';
import { Button } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useGetCruiseList } from './api/vodohod/useGetCruiseList';
import { useGetToken } from './api/vodohod/useGetToken';
import { formatDataFromVodohod } from './helpers/vodohod/formatData';

const Vodohod = () => {
  const [error, setError] = useState<string | null>(null);
  const { token, getToken, tokenError } = useGetToken();
  const { cruiseListError, getCruiseList, cruiseData } = useGetCruiseList();

  const handleSyncCruise = () => {
    if (token) {
      getCruiseList(token);
    }
  };

  useEffect(() => {
    if (tokenError) setError(tokenError);
    if (cruiseListError) setError(cruiseListError);
  }, [cruiseListError, tokenError]);

  useEffect(() => {
    if (cruiseData) {
      const temp = formatDataFromVodohod(cruiseData?.result?.data);
      console.log('prepareData', temp);
    }
  }, [cruiseData]);

  return (
    <div>
      <Button bg="red.100" onClick={getToken}>
        получить токен
      </Button>
      <Button bg="red.100" onClick={handleSyncCruise}>
        получиьт круизы
      </Button>

      {error && <p>Ошибка - {error}</p>}
    </div>
  );
};

Vodohod.layout = AdminLayout;
export default Vodohod;
