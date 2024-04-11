import { Box, Button, VStack, Text } from '@chakra-ui/react';
import { Prisma } from '@prisma/client';
import { Dispatch, SetStateAction } from 'react';

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

        <Button>Добавить</Button>
      </VStack>
      {/* </form> */}
    </Box>
  );
};
