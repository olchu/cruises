import { TextEditor } from '@/features/textEditor';
import {
  Heading,
  VStack,
  Textarea,
  Box,
  Input,
  Switch,
  Button,
  Text,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useState } from 'react';

interface AddPost {
  title: string;
  date: string;
  preview: string;
  publish: boolean;
}

export const AddPostForm = () => {
  const [content, setContent] = useState('');
  const [files, setFiles] = useState<FileList | null>(null);

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
  } = useFormik<AddPost>({
    initialValues: {
      title: '',
      date: '',
      preview: '',
      publish: false,
    },
    onSubmit: async (values) => {
      console.log('body', { ...values, content });
      console.log('file', files);
      if (files) {
        console.log()
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
      }
    },
  });
  return (
    <Box>
      <Heading mb="20px">Добавление поста</Heading>
      <form onSubmit={handleSubmit}>
        <VStack gap="18px" w="full" alignItems="none">
          <Box>
            <Text fontWeight="bold" mb="12px">
              Дата
            </Text>
            <Input
              name="date"
              value={values.date}
              onChange={handleChange}
              type="date"
            />
          </Box>
          <Box>
            <Text fontWeight="bold" mb="12px">
              Заголовок
            </Text>
            <Input name="title" value={values.title} onChange={handleChange} />
          </Box>

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
            <Input type="file" multiple onChange={handleFileChange} />
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

          <Button type="submit">Сохранить</Button>
        </VStack>
      </form>
    </Box>
  );
};
