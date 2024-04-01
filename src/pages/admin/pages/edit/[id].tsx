import { AddPageForm } from '@/features/admin/addPages';
import AdminLayout from '@/layouts/admin';
import {
  CruiseType,
  PagesPrismaType,
  ShipsType,
} from '@/shared/types/prismaResponse';
import { Box, Heading, Button, HStack, useDisclosure } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import prisma from 'prisma/client';
import { createContext, ReactElement, useState } from 'react';

type PageProps = {
  page: PagesPrismaType | null;
};

const Pages = ({ page }: PageProps) => {
  return (
    <Box>
      <Link href="/admin/pages"> назад</Link>
      <Heading as="h2" size="xl" mb="30px">
        Редактирование страницы
      </Heading>

      <HStack justifyContent="flex-end" mb="16px"></HStack>

      <AddPageForm page={page} />
    </Box>
  );
};

export const getServerSideProps = (async (context) => {
  const pageId = parseInt(context.params?.id as string);
  if (isNaN(pageId)) return { props: { page: null } };

  const pageSelect = await prisma.pages.findUnique({
    where: {
      id: pageId,
    },
  });

  const page: PagesPrismaType = JSON.parse(JSON.stringify(pageSelect));

  return { props: { page } };
}) satisfies GetServerSideProps<PageProps>;

Pages.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Pages;
