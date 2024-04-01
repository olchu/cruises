import { AddPageForm } from '@/features/admin/addPages';
import AdminLayout from '@/layouts/admin';
import { CruiseType, ShipsType } from '@/shared/types/prismaResponse';
import { Box, Heading, Button, HStack, useDisclosure } from '@chakra-ui/react';
import Link from 'next/link';
import { createContext, ReactElement, useState } from 'react';

const initialState: ContextType = {
  ships: [],
  citiesStart: [],
  citiesEnd: [],
};

type ContextType = {
  ships: ShipsType[];
  citiesStart: CruiseType[];
  citiesEnd: CruiseType[];
};

export const AdminPagesContext = createContext(initialState);

const Pages = () => {
  return (
    <Box>
        <Link href='/admin/pages'> назад</Link>
      <Heading as="h2" size="xl" mb="30px">
        Создание страницы
      </Heading>

      <HStack justifyContent="flex-end" mb="16px"></HStack>

      <AddPageForm />
    </Box>
  );
};

Pages.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Pages;
