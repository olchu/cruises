import { TagPrismaType } from '@/shared/types/prismaResponse';
import { Box, Button, HStack, Input, VStack, Text } from '@chakra-ui/react';
import { useFormik } from 'formik';

type FormikTagType = {
  name: string;
  value: string;
  content: string;
};

export const TagEditForm = ({
  tag,
  change,
}: {
  tag: TagPrismaType | null;
  change: (tag: TagPrismaType) => void;
}) => {
  const {
    handleSubmit,
    handleChange,
    values,
    resetForm,
    setFieldValue,
    isSubmitting,
  } = useFormik<FormikTagType>({
    initialValues: {
      name: tag?.key.name || '',
      value: tag?.key.val || '',
      content: tag?.content || '',
    },
    onSubmit: async (values) => {
      change({
        key: {
          name: values.name,
          val: values.value,
        },
        content: values.content,
      });
    },
  });
  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <VStack gap="18px" w="full" alignItems="none">
          <HStack gap="18px">
            <Box>
              <Text fontWeight="bold" mb="12px">
                Название Тега
              </Text>
              <Input name="name" value={values.name} onChange={handleChange} />
            </Box>
            <Box flex="1">
              <Text fontWeight="bold" mb="12px">
                Значение
              </Text>
              <Input
                name="value"
                value={values.value}
                onChange={handleChange}
              />
            </Box>
            <Box flex="1">
              <Text fontWeight="bold" mb="12px">
                content
              </Text>
              <Input
                name="content"
                value={values.content}
                onChange={handleChange}
              />
            </Box>
          </HStack>

          <Button type="submit" isLoading={isSubmitting}>
            {tag ? 'Обновить' : 'Добавить'}
          </Button>
        </VStack>
      </form>
    </Box>
  );
};
