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
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import prisma from 'prisma/client';
import { ReactElement, useRef, useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { MdEdit } from 'react-icons/md';
import { TiPlus } from 'react-icons/ti';

type PagesProps = {
  pages: PagesPrismaType[];
};

const Pages = ({ pages }: PagesProps) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [delPageId, setDelPageId] = useState<number | null>(null);
  const cancelRef = useRef(null);

  const handleEdit = (id: number) => {
    router.push(`/admin/pages/edit/${id}`);
  };

  const handleAdd = () => {
    router.push('/admin/pages/add');
  };

  const handleDeletePage = async () => {
    if (!delPageId) return;

    fetch(`/api/admin/pages/delPage?id=${delPageId}`).then((res) => {
      if (res.ok) {
        setDelPageId(null);
        router.reload();
      }
    });
  };

  const handleOpenDelModal = (id: number) => {
    setDelPageId(id);
    onOpen();
  };

  return (
    <>
      <Head>
        <title>Список страниц</title>
      </Head>
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
                    <Td>{active === 1 ? 'Активна' : 'Не видна'}</Td>
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
                        <Box
                          color="red.500"
                          p="10px"
                          cursor="pointer"
                          onClick={() => handleOpenDelModal(id)}
                        >
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
        <AlertDialog
          motionPreset="slideInBottom"
          leastDestructiveRef={cancelRef}
          onClose={onClose}
          isOpen={isOpen}
          isCentered
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Удаление страницы
              </AlertDialogHeader>

              <AlertDialogBody>Точно хочешь удалить?</AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Отмена
                </Button>
                <Button colorScheme="red" onClick={handleDeletePage} ml={3}>
                  Удалить
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </Box>
    </>
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
