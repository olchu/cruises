import AdminLayout from '@/layouts/admin';
import { GroupedShips } from '@/shared/types/shipList';
import { Box, Button, Text } from '@chakra-ui/react';
import axios from 'axios';
import { ReactElement, useState } from 'react';

const Menu = () => {
  const [shipsMenu, setShipsMenu] = useState<GroupedShips | null>(null);

  const getShipsMenu = async () => {
    const { data } = await axios.get('/api/admin/menu/getShipList');
    setShipsMenu(data.list);
  };

  const saveShipsMenu = async () => {
    const { data } = await axios.post('/api/admin/menu/saveShips', shipsMenu);
  };

  return (
    <Box>
      <Text>сформировать меню теплоходов</Text>
      <Button onClick={getShipsMenu}>сформировать</Button>
      <Button onClick={saveShipsMenu}>сохранить</Button>
      {shipsMenu && <Text>{JSON.stringify(shipsMenu)}</Text>}
    </Box>
  );
};

Menu.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Menu;
