import { DBExcursionType } from '@/shared/types/dbCruisesType';
import {
  Box,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { IoTimeOutline } from 'react-icons/io5';

const formatTime = (minutes: number) => {
  let hours = Math.floor(minutes / 60);
  let remainingMinutes = minutes % 60;
  let result = '';

  if (hours > 0) {
    result += `${hours}ч `;
  }
  if (remainingMinutes > 0) {
    result += `${remainingMinutes}мин`;
  }

  return result.trim();
};

export const CruiseExcursions = ({
  excursion,
}: {
  excursion: DBExcursionType;
}) => {
  const [show, setShow] = useState(false);
  return (
    <>
      <Box
        bg="lightBlue"
        p="6px"
        maxWidth="300px"
        display="flex"
        flexDirection="column"
        gap="6px"
      >
        <HStack justifyContent="end">
          <IoTimeOutline />
          <Text fontSize="13px">{formatTime(excursion?.duration)}</Text>
        </HStack>
        <Text fontSize="13px" fontWeight="bold">
          {excursion?.name}
          <Text
            as="span"
            ml="12px"
            fontWeight="normal"
            cursor="pointer"
            fontStyle="italic"
            onClick={() => setShow(true)}
          >
            подробнее
          </Text>
        </Text>
      </Box>
      <Modal isOpen={show} onClose={() => setShow(false)}>
        <ModalOverlay />
        <ModalContent minWidth={{ base: 'inherit', md: '80%' }} py="20px">
          <ModalCloseButton />
          <ModalBody display="flex" flexDirection="column">
            <Text fontSize="18px" fontWeight="bold" mb="20px">
              {excursion?.name}
            </Text>

            <Box
              color="text"
              dangerouslySetInnerHTML={{
                __html: excursion.description || excursion.annotation || '',
              }}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
