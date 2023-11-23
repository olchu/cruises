import { TextEditor } from '@/features/textEditor';
import { PostsType } from '@/shared/types/prismaResponse';
import {
  VStack,
  Textarea,
  Box,
  Input,
  Switch,
  Button,
  Text,
  useToast,
  HStack,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import moment from 'moment';
import { ChangeEventHandler, FC, useState } from 'react';

interface IAddPost {
  title: string;
  date: string;
  preview: string;
  publish: boolean;
}

interface IAddPosrFrom {
  post?: PostsType;
}

export const AddPostForm: FC<IAddPosrFrom> = ({ post }) => {
  const [content, setContent] = useState(post?.content || '');
  const [files, setFiles] = useState<FileList | null>(null);
  const toast = useToast();
  const initDate = post ? moment(post?.date).format('YYYY-MM-DD') : null;

  const handleDateChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setFieldValue('date', e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    setFiles(selectedFiles);
  };

  const {
    handleSubmit,
    handleChange,
    values,
    resetForm,
    setValues,
    setFieldValue,
    isSubmitting,
  } = useFormik<IAddPost>({
    initialValues: {
      title: post?.title || '',
      date: initDate || '',
      preview: post?.preview || '',
      publish: post?.publish === 'true',
    },
    onSubmit: async (values) => {
      console.log('body', { ...values, content });
      if (files) {
        console.log();
        const formData = new FormData();
        Array.from(files).forEach((file) => formData.append('files', file));
        formData.append('title', values.title);
        formData.append('date', values.date);
        formData.append('preview', values.preview);
        formData.append('publish', `${values.publish}`);
        formData.append('content', content);

        const response = await fetch('/api/addPost', {
          method: 'POST',
          body: formData,
        });

        const res = await response.json();

        if (res.status === 'ok') {
          toast({
            title: 'Пост создан',
            description: 'Новый пост создан с id=' + res.post.id,
            status: 'success',
            duration: 9000,
            isClosable: true,
          });
          resetForm();
        } else {
          toast({
            title: 'Ошибка',
            description: 'Ошибка при создании поста' + res.error,
            status: 'error',
            duration: 9000,
            isClosable: true,
          });
        }
      }
    },
  });
  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <VStack gap="18px" w="full" alignItems="none">
          <HStack gap="18px">
            <Box>
              <Text fontWeight="bold" mb="12px">
                Дата
              </Text>
              <Input
                name="date"
                value={values.date}
                onChange={handleDateChange}
                type="date"
              />
            </Box>
            <Box flex="1">
              <Text fontWeight="bold" mb="12px">
                Заголовок
              </Text>
              <Input
                name="title"
                value={values.title}
                onChange={handleChange}
              />
            </Box>
          </HStack>

          <Box>
            <Text fontWeight="bold" mb="12px">
              Анонс
            </Text>
            <Textarea
              name="preview"
              value={values.preview}
              onChange={handleChange}
            />
          </Box>

          <Box>
            <Text fontWeight="bold" mb="12px">
              Контент
            </Text>
            <TextEditor value={content} onChange={setContent} />
          </Box>

          <Box>
            <Text fontWeight="bold" mb="12px">
              Фото
            </Text>
            <Button>Выбрать</Button>
            <Input
              visibility="hidden"
              type="file"
              multiple
              onChange={handleFileChange}
            />
          </Box>

          <Box>
            <Text fontWeight="bold" mb="12px">
              Опубликовано
            </Text>
            <Switch
              name="publish"
              isChecked={values.publish}
              onChange={handleChange}
              size="lg"
            />
          </Box>

          <Button type="submit" isLoading={isSubmitting}>
            {post ? 'Обновить' : 'Создать'}
          </Button>
        </VStack>
      </form>
    </Box>
  );
};
