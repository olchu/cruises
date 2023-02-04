import AdminLayout from '@/components/layouts/admin';
import {
  Box,
  Button,
  Progress,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useGetCruiseList } from './api/vodohod/useGetCruiseList';
import { formatDataFromVodohod } from './helpers/vodohod/formatDataFromVodohod';
import { supabase } from '@/config/supabaseClient';
import { CruiseList } from './api/types';

const Vodohod = () => {
  const [error, setError] = useState<string | null>(null);
  const { cruiseListError, getCruiseList, cruiseData, isFetchingCruiseList } =
    useGetCruiseList();
  const [syncData, setSyncData] = useState<CruiseList[] | null>(null);

  const handleGetCuiseList = () => {
    getCruiseList();
  };

  const handleSync = async () => {
    if (syncData && syncData.length > 0) {
      const { data, error } = await supabase
        .from('cruises2')
        .upsert(syncData, { onConflict: 'exId' });
      console.log('error', error);
      console.log('data', data);
    }
  };

  useEffect(() => {
    if (cruiseListError) setError(cruiseListError);
  }, [cruiseListError]);

  useEffect(() => {
    if (cruiseData) {
      const temp = formatDataFromVodohod(cruiseData?.result?.data);
      console.log('prepareData', temp);
      setSyncData(temp);
    }
  }, [cruiseData]);

  return (
    <div>
      <Box>
        Выгрузить круизы из Водохода
        <Button ml={8} bg="blue.200" onClick={handleGetCuiseList}>
          Выгрузить
        </Button>
        {isFetchingCruiseList && <Progress mt={8} size="xs" isIndeterminate />}
      </Box>

      {syncData && (
        <Box my={8}>
          Будет вставлено или обновлено {syncData.length} круизов
          <Button ml={8} bg="blue.200" onClick={handleSync}>
            Синхронизировать
          </Button>
        </Box>
      )}
      {error && <p>Ошибка - {error}</p>}
    </div>
  );
};

Vodohod.layout = AdminLayout;
export default Vodohod;
