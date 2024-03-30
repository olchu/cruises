import { AddPageForm } from '@/features/admin/addPages';
import AdminLayout from '@/layouts/admin';
import { getCities } from '@/shared/api/getCities';
import { getShips } from '@/shared/api/getShips';
import {
  CruiseType,
  PagesPrismaType,
  ShipsType,
} from '@/shared/types/prismaResponse';
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
import prisma from 'prisma/client';
import { createContext, ReactElement, useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { MdEdit } from 'react-icons/md';
import { TiPlus } from 'react-icons/ti';

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

type PagesProps = {
  pages: PagesPrismaType[];
  ships: ShipsType[];
  citiesStart: CruiseType[];
  citiesEnd: CruiseType[];
};

const Pages = ({ pages, ships, citiesStart, citiesEnd }: PagesProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editableId, setEditableId] = useState<number | null>(null);

  const handleEdit = (id: number) => {
    setEditableId(id);
    onOpen();
  };

  const handleClose = () => {
    setEditableId(null);
    onClose();
  };

  return (
    <AdminPagesContext.Provider value={{ ships, citiesStart, citiesEnd }}>
      <Box>
        <Heading as="h1" size="2xl" mb="30px">
          Страницы
        </Heading>

        <HStack justifyContent="flex-end" mb="16px">
          <Button colorScheme="green" onClick={onOpen}>
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
                          onClick={() => handleEdit(index)}
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

        <Modal
          isOpen={isOpen}
          onClose={handleClose}
          isCentered
          scrollBehavior="inside"
        >
          <ModalOverlay />
          <ModalContent maxW="1024px">
            <ModalHeader>
              Редактирование страницы /{pages[editableId!]?.slug}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <AddPageForm page={pages[editableId!]} />
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
    </AdminPagesContext.Provider>
  );
};

export const getServerSideProps = (async ({ req }) => {
  const ships = await getShips();
  const citiesStart = await getCities('cityStart');
  const citiesEnd = await getCities('cityEnd');
  const pagesSelect = await prisma.pages.findMany();

  const pages: PagesPrismaType[] = JSON.parse(JSON.stringify(pagesSelect));

  return { props: { pages, ships, citiesStart, citiesEnd } };
}) satisfies GetServerSideProps<PagesProps>;

Pages.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Pages;
