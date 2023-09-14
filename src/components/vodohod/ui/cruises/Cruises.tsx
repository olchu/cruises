import { CruiseList } from '@/pages/admin/api/types';
import { useGetCruiseList } from '@/pages/admin/api/vodohod/useGetCruiseList';
import { useGetCruisePrice } from '@/pages/admin/api/vodohod/useGetCruisePrice';
import { formatDataFromVodohod } from '@/pages/admin/helpers/vodohod/formatDataFromVodohod';
import { Box, Button, Progress } from '@chakra-ui/react';
import { useState, useEffect } from 'react';

export const Cruises = () => {
  const [error, setError] = useState<string | null>(null);
  const { cruiseListError, getCruiseList, cruiseData, isFetchingCruiseList } =
    useGetCruiseList();
  const [syncData, setSyncData] = useState<CruiseList[] | null>(null);
  const { error: priceError, getCruisePrice, price } = useGetCruisePrice();

  const handleGetCuiseList = () => {
    getCruiseList();
  };

  const handleGetPrice = () => {
    getCruisePrice(syncData || []);
  };

  const handleSync = async () => {
    console.log('syncData', syncData);
    // const res = await syncCruise(syncData || []);
    // console.log(res);
    // if (syncData && syncData.length > 0) {
    //   const { data, error } = await supabase
    //     .from('cruises2')
    //     .upsert(syncData, { onConflict: 'exId' });
    //   console.log('error', error);
    //   console.log('data', data);
    // }
  };

  useEffect(() => {
    console.log('price', price);
  }, [price]);

  useEffect(() => {
    if (cruiseListError) setError(cruiseListError);
  }, [cruiseListError]);

  useEffect(() => {
    if (cruiseData && price.length > 0) {
      const temp = formatDataFromVodohod(cruiseData, price);
      console.log('prepareData', temp);
      setSyncData(temp);
    }
  }, [cruiseData, price]);

  return (
    <>
      <Box>
        Выгрузить круизы из Водохода
        <Button ml={8} bg="blue.200" onClick={handleGetCuiseList}>
          Выгрузить
        </Button>
        {isFetchingCruiseList && <Progress mt={8} size="xs" isIndeterminate />}
      </Box>

      <Button ml={8} bg="blue.200" onClick={handleGetPrice}>
        Загрузить цены к куризам
      </Button>
      {syncData && (
        <Box my={8}>
          Будет вставлено или обновлено {syncData.length} круизов
        </Box>
      )}
      {price.length > 0 && (
        <Box my={8}>
          Цены загружены
          <Button ml={8} bg="blue.200" onClick={handleGetPrice}>
            Синхронизировать
          </Button>
        </Box>
      )}

      {error && <p>Ошибка - {error}</p>}
    </>
  );
};
