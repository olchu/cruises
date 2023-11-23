import { AddPostForm } from '@/features/admin/addPost';
import AdminLayout from '@/layouts/admin';
import { PostsType } from '@/shared/types/prismaResponse';
import {
  Box,
  Heading,
  Table,
  TableCaption,
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
import moment from 'moment';
import { GetServerSideProps } from 'next';
import prisma from 'prisma/client';
import { ReactElement, useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { MdEdit } from 'react-icons/md';
import { TiPlus } from 'react-icons/ti';

interface IPostProps {
  posts: PostsType[];
}

const Posts = ({ posts }: IPostProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editableId, setEditableId] = useState<number | null>(null);

  const handleEdit = (id: number) => {
    setEditableId(id);
    onOpen();
  };

  return (
    <Box>
      <Heading as="h1" size="2xl" mb="30px">
        Посты
      </Heading>

      <HStack justifyContent="flex-end" mb="16px">
        <Button colorScheme="green">
          Добавить <TiPlus />
        </Button>
      </HStack>

      <TableContainer>
        <Table variant="striped" colorScheme="gray">
          <TableCaption>Imperial to metric conversion factors</TableCaption>
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>Заголовок</Th>
              <Th>Дата</Th>
              <Th>Статус</Th>
              <Th>Редактировать</Th>
            </Tr>
          </Thead>
          <Tbody>
            {posts.map(({ id, title, publish, date }, index) => {
              const formatedDate = moment(date).format('DD.MM.YYYY');
              return (
                <Tr key={id}>
                  <Td>{id}</Td>
                  <Td>{title}</Td>
                  <Td>{formatedDate}</Td>
                  <Td>{publish === 'true' ? 'Отображается' : 'Не виден'}</Td>
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
        onClose={onClose}
        isCentered
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent maxW="1024px">
          <ModalHeader>
            Редактирование поста с id={posts[editableId!]?.id}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AddPostForm post={posts[editableId!]} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export const getServerSideProps = (async ({ req }) => {
  const blogSelect = await prisma.blog.findMany({
    orderBy: {
      date: 'desc',
    },
    where: {
      publish: 'true',
    },
  });

  const posts: PostsType[] = JSON.parse(JSON.stringify(blogSelect));

  return { props: { posts } };
}) satisfies GetServerSideProps<IPostProps>;

Posts.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Posts;
