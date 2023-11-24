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
  Image,
  Flex,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import moment from 'moment';
import { FC, useState } from 'react';
import { MdDelete } from 'react-icons/md';

interface IAddPost {
  title: string;
  date: string;
  preview: string;
  publish: boolean;
}

interface IAddPosrFrom {
  post?: PostsType;
}

const ADD_API = '/api/addPost';
const UPDATE_API = '/api/updatePost';

export const AddPostForm: FC<IAddPosrFrom> = ({ post }) => {
  const toast = useToast();
  const [content, setContent] = useState(post?.content || '');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const initDate = post ? moment(post?.date).format('YYYY-MM-DD') : null;
  const [postImages, setPostImages] = useState<string[]>(() => {
    if (post?.images) {
      console.log('');
      return JSON.parse(post.images)?.map((item: string) => item);
    }
    return [];
  });

  const [uploadImages, setUploadImages] = useState<string[]>([]);

  const endpoint = post ? UPDATE_API : ADD_API;

  const handleDateChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setFieldValue('date', e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = e.target.files;

      let images: string[] = [];
      for (let i = 0; i < selectedFiles.length; i++) {
        let img = selectedFiles.item(i);
        if (img) {
          images.push(URL.createObjectURL(img));
        }
      }
      setUploadedFiles((prev) => [...prev, ...Array.from(selectedFiles)]);
      setUploadImages((prev) => [...prev, ...images]);
    }
  };

  const handleDelPostImages = (index: number) => {
    setPostImages((prev) => {
      const tmp = [...prev];
      tmp.splice(index, 1);
      return [...tmp];
    });
  };

  const handleDelUploadImage = (index: number) => {
    setUploadImages((prev) => {
      const tmp = [...prev];
      tmp.splice(index, 1);
      return [...tmp];
    });

    setUploadedFiles((prev) => {
      const tmp = [...prev];
      tmp.splice(index, 1);
      return [...tmp];
    });
  };

  const {
    handleSubmit,
    handleChange,
    values,
    resetForm,
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
      if (true) {
        console.log();
        const formData = new FormData();
        if (uploadedFiles.length > 0)
          uploadedFiles.forEach((file) => formData.append('files', file));

        // add form field
        if (post?.id) {
          formData.append('id', `${post.id}`);
        }
        if (post) {
          formData.append('images', JSON.stringify(postImages));
        }
        formData.append('title', values.title);
        formData.append('date', values.date);
        formData.append('preview', values.preview);
        formData.append('publish', `${values.publish}`);
        formData.append('content', content);

        const response = await fetch(endpoint, {
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
            <HStack gap="10px" mb="16px">
              {postImages.map((item, index) => {
                return (
                  <Box key={index} position="relative">
                    <Image src={item} w="150px" h="100px" alt="img" />
                    <Box
                      as="span"
                      position="absolute"
                      top={1}
                      color="red"
                      bg="white"
                      p="4px"
                      right={1}
                      cursor="pointer"
                      onClick={() => handleDelPostImages(index)}
                    >
                      <MdDelete />
                    </Box>
                  </Box>
                );
              })}
              {uploadImages.map((item, index) => {
                return (
                  <Box key={index} position="relative">
                    <Image src={item} w="150px" h="100px" alt="img" />
                    <Box
                      as="span"
                      position="absolute"
                      top={1}
                      color="red"
                      bg="white"
                      p="4px"
                      right={1}
                      cursor="pointer"
                      onClick={() => handleDelUploadImage(index)}
                    >
                      <MdDelete />
                    </Box>
                  </Box>
                );
              })}
              <label>
                <Flex
                  w="150px"
                  h="100px"
                  border="1px dashed"
                  borderColor="gray.400"
                  color="gray.400"
                  justifyContent="center"
                  align="center"
                  cursor="pointer"
                >
                  Выбрать
                </Flex>
                <Input
                  display="none"
                  type="file"
                  multiple
                  onChange={handleFileChange}
                />
              </label>
            </HStack>
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
