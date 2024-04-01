import { AddPageForm } from '@/features/admin/addPages';
import AdminLayout from '@/layouts/admin';
import { PagesPrismaType } from '@/shared/types/prismaResponse';
import {
  Box,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import prisma from 'prisma/client';
import { ReactElement, useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { MdEdit } from 'react-icons/md';
import { TiPlus } from 'react-icons/ti';

type PagesProps = {
  pages: PagesPrismaType[];
};

const Pages = ({ pages }: PagesProps) => {
  const router = useRouter();

  const handleEdit = (id: number) => {
    router.push(`/admin/pages/edit/${id}`);
  };

  const handleAdd = () => {
    router.push('/admin/pages/add');
  };

  return (
    <Box>
      <Heading as="h1" size="2xl" mb="30px">
        Страницы
      </Heading>

      <HStack justifyContent="flex-end" mb="16px">
        <Button colorScheme="green" onClick={handleAdd}>
          Добавить <TiPlus />
        </Button>
      </HStack>

      <TableContainer>
        <Table variant="striped" colorScheme="gray">
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>url</Th>
              <Th>Заголовок</Th>
              <Th>Статус</Th>
              <Th>Редактировать</Th>
            </Tr>
          </Thead>
          <Tbody>
            {pages.map(({ id, title, active, slug }, index) => {
              // const formatedDate = moment(date).format('DD.MM.YYYY');
              return (
                <Tr key={id}>
                  <Td>{id}</Td>
                  <Td>/{slug}</Td>
                  <Td>{title}</Td>
                  <Td>{active === 1 ? 'Активна' : 'Не виден'}</Td>
                  <Td>
                    <HStack gap="16px" justifyContent="center">
                      <Box
                        color="teal.500"
                        p="10px"
                        cursor="pointer"
                        onClick={() => handleEdit(id)}
                      >
                        <MdEdit />
                      </Box>
                      <Box color="red.500" p="10px" cursor="pointer">
                        <MdDelete />
                      </Box>
                    </HStack>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export const getServerSideProps = (async ({ req }) => {
  const pagesSelect = await prisma.pages.findMany();
  const pages: PagesPrismaType[] = JSON.parse(JSON.stringify(pagesSelect));

  return { props: { pages } };
}) satisfies GetServerSideProps<PagesProps>;

Pages.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Pages;
