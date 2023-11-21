'use client';
import { Heading } from '@/shared/ui/heading';
import { MainContainer } from '@/shared/ui/mainContainer/MainContainer';
import { Flex, VStack, Text, Box, Image, Link, HStack } from '@chakra-ui/react';
import NextLink from 'next/link';
import { IoIosArrowRoundForward } from 'react-icons/io';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { FC } from 'react';
import { PostsType } from '@/shared/types/prismaResponse';
import moment from 'moment';

interface IBlogPreview {
  posts: PostsType[];
}

export const BlogPreview: FC<IBlogPreview> = ({ posts }) => {
  console.log(posts);
  return (
    <MainContainer
      as="section"
      overflow="hidden"
      px={{ base: 'section.mobile', lg: 'section.desktop' }}
      py={{ base: '30px', lg: '60px' }}
      width="full"
    >
      <Heading>Наш блог</Heading>

      <Flex
        flexDirection={{ base: 'column', md: 'row' }}
        maxW={'1400px'}
        w="100%"
        gap="20px"
      >
        {posts.map(({ id, images, title, date }) => {
          const image = JSON.parse(images!)[0];
          const formatedDate = moment(date).format('DD.MM.YYYY');
          return (
            <VStack gap="10px" alignItems="flex-start" w="full" key={id}>
              <Box
                as="a"
                href={`/blog/${id}`}
                h="200px"
                width="100%"
                display="block"
              >
                <Image
                  src={`/uploads/${image}`}
                  alt="blog"
                  width="100%"
                  height="100%"
                  objectFit="cover"
                  objectPosition="center"
                />
              </Box>
              <Text color="grey" fontSize="12px">
                {formatedDate}
              </Text>
              <Text fontSize="18px">{title}</Text>
            </VStack>
          );
        })}
      </Flex>
      <HStack justifyContent={{ base: 'center', md: 'flex-end' }} mt="14px">
        <Link
          as={NextLink}
          color="primary"
          href={`/blog`}
          mb="12px"
          display="flex"
          alignItems="center"
          gap="8px"
          position="relative"
          _hover={{ textDecoration: 'none' }}
        >
          Читать блог
          <IoIosArrowRoundForward />
        </Link>
      </HStack>
    </MainContainer>
  );
};
