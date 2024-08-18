/* eslint-disable react/no-unescaped-entities */
import { TextEditor } from '@/features/textEditor';
import { defaultItemsOnPage, domainUrl } from '@/shared/constants/constants';
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
  Textarea,
  ListItem,
  UnorderedList,
  Heading,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { MdDelete } from 'react-icons/md';

type AddPage = {
  title: string;
  slug: string;
  active: boolean;
  query: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  seoCanonicalUrl: string;
  itemsOnPage: number;
};

type AddPageFrom = {
  page?: (Omit<PagesPrismaType, 'id'> & { id: number | null }) | null;
};

const ADD_API = '/api/admin/pages/addPage';
const UPDATE_API = '/api/admin/pages/updatePage';

export const AddPageForm: FC<AddPageFrom> = ({ page }) => {
  const endpoint = page?.id ? UPDATE_API : ADD_API;
  const toast = useToast();
  const [content, setContent] = useState(page?.content || '');
  const [uploadedFiles, setUploadedFiles] = useState<File | null>(null);
  const [uploadImages, setUploadImages] = useState<string>(''); // TODO: union with pageImage(post =) )
  const [postImages, setPostImages] = useState<string>(() => {
    return page?.images || '';
  });

  const router = useRouter();

  const [metaTags, setMetaTags] = useState<TagPrismaType[]>(
    Array.isArray(page?.metaTag) ? (page?.metaTag as TagPrismaType[]) : []
  );

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
      active: page?.active === 0 ? false : true,
      query: JSON.stringify(page?.query) || '',
      seoTitle: page?.seoTitle || '',
      seoDescription: page?.seoDescription || '',
      seoKeywords: page?.seoKeywords || '',
      seoCanonicalUrl: page?.seoCanonicalUrl || '',
      itemsOnPage: page?.itemsOnPage || defaultItemsOnPage,
    },
    onSubmit: async (values) => {
      if (true) {
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
        formData.append('metaTag', JSON.stringify([]));
        formData.append('query', values.query);
        formData.append('seoTitle', values.seoTitle);
        formData.append('seoDescription', values.seoDescription);
        formData.append('seoKeywords', values.seoKeywords);
        formData.append('seoCanonicalUrl', values.seoCanonicalUrl);
        formData.append('itemsOnPage', `${values.itemsOnPage}`);

        const response = await fetch(endpoint, {
          method: 'POST',
          body: formData,
        });

        const res = await response.json();

        const toatsTitle = page?.id ? 'Страница обновлена' : 'Страница создана';
        const toatsDescription = page?.id
          ? 'Обновлена страница с url=/'
          : 'Новая страница создана с url=/';
        const toatsError = page?.id
          ? 'Ошибка при обновлении страницы'
          : 'Ошибка при создании страницы';

        if (res.status === 'ok') {
          router.push('/admin/pages');
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

  useEffect(() => {
    if (page?.id) return;
    setFieldValue('seoCanonicalUrl', `${domainUrl}/${values.slug}`);
  }, [values.slug]);

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
            <Box>
              <Text fontWeight="bold" mb="12px">
                Опубликовано
              </Text>
              <Switch
                name="active"
                isChecked={values.active}
                onChange={handleChange}
                size="lg"
              />
            </Box>
          </HStack>

          <Box>
            <Text fontWeight="bold" mb="12px">
              Картинка в заголовке
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
              Контент
            </Text>
            <TextEditor value={content} onChange={setContent} />
          </Box>
          <Box>
            <Text fontWeight="bold" mb="12px">
              Данные для запроса{' '}
              <Text as="span" fontSize="14" fontWeight="normal">
                (здесь пока вставляется JSON)
              </Text>
            </Text>
            <Textarea
              name="query"
              value={values.query}
              onChange={handleChange}
              placeholder="Here is a sample placeholder"
            />
            <Box fontSize="12px" mt="12px">
              <Text fontWeight="bold">
                Это массив подборок. В подборке могут быть след. поля:
              </Text>
              <UnorderedList>
                <ListItem>"dateStart":"2024-03-13"</ListItem>
                <ListItem>"dateEnd":"2024-03-13"</ListItem>
                <ListItem>"cityFrom":"Астрахань"</ListItem>
                <ListItem>"cityEnd":"Волгоград"</ListItem>
                <ListItem>"days":4</ListItem>
                <ListItem>
                  "shipId":[10] или если несколько "shipId":[10,12,13]
                </ListItem>
                <ListItem>
                  можно задать id конкретных круизов "id"=[1,2,3]
                </ListItem>
                <ListItem>
                  "class":"Эконом". Комфорт, Люкс, Эконом, Премиум, Стандарт
                </ListItem>
                <ListItem>
                  "type":"Речные по России". Речные по России, Экспедиции,
                  Зарубежные, Речные по Беларуси
                </ListItem>
              </UnorderedList>
            </Box>
          </Box>
          <Box>
            <Text fontWeight="bold" mb="12px">
              Количество на странице
            </Text>
            <Input
              name="itemsOnPage"
              type="number"
              value={values.itemsOnPage}
              onChange={handleChange}
            />
          </Box>

          <Box>
            <Heading as="h3" size="md" mb="12px">
              SEO
            </Heading>

            <Text fontWeight="bold" mb="12px">
              SEO title
            </Text>
            <Input
              name="seoTitle"
              value={values.seoTitle}
              onChange={handleChange}
            />
            <Text fontWeight="bold" mb="12px">
              SEO description
            </Text>
            <Textarea
              name="seoDescription"
              value={values.seoDescription}
              onChange={handleChange}
            />
            <Text fontWeight="bold" mb="12px">
              SEO keywords
            </Text>
            <Input
              name="seoKeywords"
              value={values.seoKeywords}
              onChange={handleChange}
            />
            <Text fontWeight="bold" mb="12px">
              SEO сanonical
            </Text>
            <Input
              name="seoCanonicalUrl"
              value={values.seoCanonicalUrl}
              onChange={handleChange}
            />
          </Box>

          {/* <MetaTagsEdit tags={metaTags} setTag={setMetaTags} /> */}

          <Button type="submit" isLoading={isSubmitting}>
            {page?.id ? 'Обновить' : 'Создать'}
          </Button>
        </VStack>
      </form>
    </Box>
  );
};
