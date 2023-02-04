import AdminLayout from '@/components/layouts/admin';
import {
  Box,
  Button,
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
import { useGetToken } from './api/vodohod/useGetToken';
import { formatDataFromVodohod } from './helpers/vodohod/formatDataFromVodohod';
import { supabase } from '@/config/supabaseClient';
import { CruiseList } from './api/types';

const Vodohod = () => {
  const [error, setError] = useState<string | null>(null);
  const { token, getToken, tokenError } = useGetToken();
  const { cruiseListError, getCruiseList, cruiseData } = useGetCruiseList();
  const [syncData, setSyncData] = useState<CruiseList[] | null>(null);

  const handleSyncCruise = () => {
    if (token) {
      getCruiseList(token);
    }
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
    if (tokenError) setError(tokenError);
    if (cruiseListError) setError(cruiseListError);
  }, [cruiseListError, tokenError]);

  useEffect(() => {
    if (cruiseData) {
      const temp = formatDataFromVodohod(cruiseData?.result?.data);
      console.log('prepareData', temp);
      setSyncData(temp);
    }
  }, [cruiseData]);

  return (
    <div>
      <Button bg="red.100" onClick={getToken}>
        получить токен
      </Button>
      <Button bg="blue.200" onClick={handleSyncCruise}>
        Выгрузить
      </Button>

      {syncData && (
        <Box my={8}>
          Будет вставлено или обновлено {syncData.length} круизов
          <Button ml={8} bg="blue.200"  onClick={handleSync}>
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
