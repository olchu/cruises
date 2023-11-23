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
  HStack, Image
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import moment from 'moment';
import { FC, useState } from 'react';

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
  const [selectedImages, setSelectedImages] = useState<string[]>(() => {
    if (post?.images) {
      return JSON.parse(post.images)?.map(
        (item: string) => `/uploads/blog/${item}`
      );
    }
    return [];
  });

  console.log('img', post?.images);

  const handleDateChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setFieldValue('date', e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = e.target.files;

      let images = [];
      for (let i = 0; i < selectedFiles.length; i++) {
        let img = selectedFiles.item(i);
        if (img) {
          images.push(URL.createObjectURL(img));
        }
      }
      setFiles(selectedFiles);
      setSelectedImages(images);
    }
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

        // add form field
        if (post?.id) {
          formData.append('id', `${post.id}`);
        }
        formData.append('title', values.title);
        formData.append('date', values.date);
        formData.append('preview', values.preview);
        formData.append('publish', `${values.publish}`);
        formData.append('content', content);

        const response = await fetch('/api/addPost', {
          method: post ? 'UPDATE' : 'POST',
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
            <HStack gap="10px" mb="16px">
              {selectedImages.map((item, index) => {
                return (
                  <Image key={index} src={item} w="150px" h="100px" alt="img" />
                );
              })}
            </HStack>

            <label>
              <Button as="div">Выбрать</Button>
              <Input
                visibility="hidden"
                type="file"
                multiple
                onChange={handleFileChange}
              />
            </label>
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
