import { TagPrismaType } from '@/shared/types/prismaResponse';
import {
  Box,
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { MdEdit, MdDelete } from 'react-icons/md';
import { TagEditForm } from './TagEditForm';

export const MetaTagsEdit = ({
  tags,
  setTag,
}: {
  tags: TagPrismaType[];
  setTag: Dispatch<SetStateAction<TagPrismaType[]>>;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editableTag, setEditableTag] = useState<number | null>(null);

  const handleEdit = (id: number) => {
    setEditableTag(id);
    setTimeout(onOpen);
  };

  const handleChange = useCallback(
    (tag: TagPrismaType) => {
      console.log('editableTag', editableTag);
      if (editableTag !== null) {
        console.log('update');
        setTag((prev) => {
          const newTags = [...prev];
          newTags[editableTag] = tag;
          return newTags;
        });
        setEditableTag(null);
      } else {
        console.log('add');
        setTag((prev) => {
          return [...prev, tag];
        });
      }

      onClose();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [editableTag]
  );

  return (
    <Box>
      <HStack alignItems="center" gap="20px" mb="12px">
        <Text fontWeight="bold">Метатеги</Text>
        <Button size="sm" colorScheme={'green'} onClick={onOpen}>
          +
        </Button>
      </HStack>
      <TableContainer>
        <Table variant="striped" colorScheme="gray">
          <Thead>
            <Tr>
              <Th>key</Th>
              <Th>value</Th>
              <Th>Content</Th>
              <Th>Редактировать</Th>
            </Tr>
          </Thead>
          <Tbody>
            {tags?.map((tag, index) => {
              return (
                <Tr key={tag.key.val}>
                  <Td>{tag.key.name}</Td>
                  <Td>{tag.key.val}</Td>
                  <Td>{tag.content}</Td>
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
          <ModalHeader>Редактирование</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TagEditForm tag={tags[editableTag!]} change={handleChange} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};
