'use client';
import { Heading } from '@/shared/ui/heading';
import { MainContainer } from '@/shared/ui/mainContainer/MainContainer';
import { Flex, VStack, Text, Box, Image, Link, HStack } from '@chakra-ui/react';
import NextLink from 'next/link';
import blogImg from '../../../../uploads/blog/post_1-post4_15.jpeg';
import { IoIosArrowRoundForward } from 'react-icons/io';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export const BlogPreview = () => {
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
        {[1, 2, 3].map((item, id) => {
          return (
            <VStack gap="10px" alignItems="flex-start" w="full" key={id}>
              <Box as="a" href="#" h="200px" width="100%" display="block">
                <Image
                  src={blogImg.src}
                  alt="blog"
                  width="100%"
                  height="100%"
                  objectFit="cover"
                  objectPosition="center"
                />
              </Box>
              <Text color="grey" fontSize="12px">
                20.11.2023
              </Text>
              <Text fontSize="18px">Title of blog</Text>
            </VStack>
          );
        })}
      </Flex>
      <HStack justifyContent={{base: "center",md:"flex-end"}} mt="14px">
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
