import { Divider, Stack } from '@chakra-ui/react';
import { GetShipsFromProvider } from './components/GetShipsFromProvider';

export const Ships = () => {
  return (
    <>
      <Stack direction="column" spacing={6}>
        <GetShipsFromProvider />
        <Divider />
      </Stack>
    </>
  );
};
