import { TextEditor } from '@/features/textEditor';
import { PagesPrismaType, TagPrismaType } from '@/shared/types/prismaResponse';
import {
  VStack,
  Box,
  Input,
  Switch,
  Button,
  Text,
  useToast,
  HStack,
  Image,
  Flex,
  ListItem,
  UnorderedList,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { FC, useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { MetaTagsEdit } from './MetaTagsEdit';

type AddPage = {
  title: string;
  slug: string;
  active: boolean;
  query: string;
};

type AddPageFrom = {
  page?: PagesPrismaType;
};

const ADD_API = '/api/admin/pages/addPage';
const UPDATE_API = '/api/admin/pages/updatePage';

export const AddPageForm: FC<AddPageFrom> = ({ page }) => {
  const endpoint = page ? UPDATE_API : ADD_API;
  const toast = useToast();
  const [content, setContent] = useState(page?.content || '');
  const [uploadedFiles, setUploadedFiles] = useState<File | null>(null);
  const [uploadImages, setUploadImages] = useState<string>(''); // TODO: union with pageImage(post =) )
  const [postImages, setPostImages] = useState<string>(() => {
    return page?.images || '';
  });

  const [metaTags, setMetaTags] = useState<TagPrismaType[]>(
    Array.isArray(page?.metaTag) ? (page?.metaTag as TagPrismaType[]) : []
  );

  const [query, setQuery] = useState(page?.query || '');

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
      setUploadedFiles(selectedFiles[0]);
      setUploadImages(images[0] || '');
    }
  };

  const handleDelPostImages = () => {
    setPostImages('');
    setUploadImages('');
    setUploadedFiles(null);
  };

  const {
    handleSubmit,
    handleChange,
    values,
    resetForm,
    setFieldValue,
    isSubmitting,
  } = useFormik<AddPage>({
    initialValues: {
      title: page?.title || '',
      slug: page?.slug || '',
      active: page?.active === 1,
      query: page?.query || '',
    },
    onSubmit: async (values) => {
      console.log('body', { ...values, content });
      if (true) {
        console.log();
        const formData = new FormData();
        if (uploadedFiles) formData.append('files', uploadedFiles);

        // add form field
        if (page?.id) {
          formData.append('id', `${page.id}`);
        }
        if (page) {
          formData.append('images', JSON.stringify(postImages));
        }
        formData.append('title', values.title);
        formData.append('slug', values.slug);
        formData.append('active', `${values.active}`);
        formData.append('content', content);
        formData.append('metaTag', JSON.stringify(metaTags));

        const response = await fetch(endpoint, {
          method: 'POST',
          body: formData,
        });

        const res = await response.json();

        const toatsTitle = page ? 'Пост обновлен' : 'Пост создан';
        const toatsDescription = page
          ? 'Обновлен пост с id='
          : 'Новый пост создан с id=';
        const toatsError = page
          ? 'Ошибка при обновлении поста'
          : 'Ошибка при создании поста';

        if (res.status === 'ok') {
          toast({
            title: toatsTitle,
            description: toatsDescription + res.post.id,
            status: 'success',
            duration: 9000,
            isClosable: true,
          });
          resetForm();
        } else {
          toast({
            title: 'Ошибка',
            description: toatsError + res.error,
            status: 'error',
            duration: 9000,
            isClosable: true,
          });
        }
      }
    },
  });

  const image = uploadImages || postImages;

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <VStack gap="18px" w="full" alignItems="none">
          <HStack gap="18px">
            <Box>
              <Text fontWeight="bold" mb="12px">
                Адрес
              </Text>
              <Input name="slug" value={values.slug} onChange={handleChange} />
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
              Контент
            </Text>
            <TextEditor value={content} onChange={setContent} />
          </Box>
          <Box>
            <Text fontWeight="bold" mb="12px">
              Строка запроса
            </Text>
            <Input name="query" value={values.query} onChange={handleChange} />
            <Box fontSize="12px" mt="12px">
              <Text fontWeight="bold">Возможные значения(примеры)</Text>
              <UnorderedList>
                <ListItem>dateStart=2024-03-13</ListItem>
                <ListItem>dateEnd=2024-03-13</ListItem>
                <ListItem>ship=10 или если несколько ship=10,20,30</ListItem>
                <ListItem>cityFrom=Астрахань</ListItem>
                <ListItem>cityEnd=Волгоград</ListItem>
                <ListItem>days=4</ListItem>
                <ListItem>можно задать id круизов id=1,2,3</ListItem>
              </UnorderedList>
            </Box>
          </Box>

          <Box>
            <Text fontWeight="bold" mb="12px">
              Фото
            </Text>
            <HStack gap="10px" mb="16px">
              {image && (
                <Box position="relative">
                  <Image src={image} w="150px" h="100px" alt="img" />
                  <Box
                    as="span"
                    position="absolute"
                    top={1}
                    color="red"
                    bg="white"
                    p="4px"
                    right={1}
                    cursor="pointer"
                    onClick={() => handleDelPostImages()}
                  >
                    <MdDelete />
                  </Box>
                </Box>
              )}
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
                <Input display="none" type="file" onChange={handleFileChange} />
              </label>
            </HStack>
          </Box>

          <Box>
            <Text fontWeight="bold" mb="12px">
              Опубликовано
            </Text>
            <Switch
              name="publish"
              isChecked={values.active}
              onChange={handleChange}
              size="lg"
            />
          </Box>

          <MetaTagsEdit tags={metaTags} setTag={setMetaTags} />

          {/* <QueryEdit query={query} setQuery={setQuery}/> */}

          <Button type="submit" isLoading={isSubmitting}>
            {page ? 'Обновить' : 'Создать'}
          </Button>
        </VStack>
      </form>
    </Box>
  );
};
