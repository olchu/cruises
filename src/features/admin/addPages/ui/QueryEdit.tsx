import {
  SearchBarInputDate,
  urlParamNames,
} from '@/features/searchBar/ui/SearchBarInputDate';
import { SearchBarSelect } from '@/features/searchBar/ui/SearchBarSelect';
import { AdminPagesContext } from '@/pages/admin/pages';
import { TagPrismaType } from '@/shared/types/prismaResponse';
import { Box, Button, HStack, Input, VStack, Text } from '@chakra-ui/react';
import { Prisma } from '@prisma/client';
import { useFormik } from 'formik';
import { Dispatch, SetStateAction, useContext } from 'react';
import { BiSolidShip } from 'react-icons/bi';
import { IoLocationSharp } from 'react-icons/io5';

type FormikQueryEditType = {
  name: string;
  value: string;
  content: string;
};

export const QueryEdit = ({
  query,
  setQuery,
}: {
  query: string;
  setQuery: Dispatch<
    SetStateAction<
      string | number | true | Prisma.JsonObject | Prisma.JsonArray
    >
  >;
}) => {
  const { ships, citiesStart, citiesEnd } = useContext(AdminPagesContext);

  // const {
  //   handleSubmit,
  //   handleChange,
  //   values,
  //   resetForm,
  //   setFieldValue,
  //   isSubmitting,
  // } = useFormik<FormikQueryEditType>({
  //   initialValues: {
  //     // name: tag?.key.name || '',
  //     // value: tag?.key.val || '',
  //     // content: tag?.content || '',
  //   },
  //   onSubmit: async (values) => {},
  // });
  return (
    <Box>
      {/* <form onSubmit={handleSubmit}> */}
      <Text fontWeight="bold" mt="30px">
        Формирование запроса
      </Text>
      <VStack gap="18px" w="full" alignItems="none">
        {/* <Text>query = {query}</Text> */}

        <Button >Добавить</Button>
      </VStack>
      {/* </form> */}
    </Box>
  );
};
