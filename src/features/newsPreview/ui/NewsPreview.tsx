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
import { NewsPrismaType } from '@/shared/types/prismaResponse';
import moment from 'moment';

interface IBlogPreview {
  news: NewsPrismaType[];
}

export const NewsPreview: FC<IBlogPreview> = ({ news }) => {
  console.log(news);

  const { id, image, title, date, link } = news[0];
  const formatedDate = moment(date).format('DD.MM.YYYY');

  const img = JSON.parse(image!);

  return (
    <MainContainer
      as="section"
      overflow="hidden"
      px={{ base: 'section.mobile', lg: 'section.desktop' }}
      py={{ base: '30px', lg: '60px' }}
      maxW={'1400px'}
    >
      <Heading>Новости</Heading>

      <Flex
        gap="20px"
        h={{ base: 'inherit', md: '400px' }}
        flexDirection={{ base: 'column', md: 'row' }}
        w="full"
      >
        <Box w="full" maxW={{ base: '100%', md: '60%' }} h="full">
          <VStack
            gap="10px"
            justifyContent="space-between"
            w="full"
            h={{ base: '300px', md: 'full' }}
            key={id}
            position="relative"
          >
            <Box
              as={NextLink}
              href={link|| ''}
              h="80%"
              width="full"
              display="block"
              flex="1"
            >
              <Image
                src={img[0]}
                alt={title}
                width="100%"
                height="100%"
                objectFit="cover"
                objectPosition="center"
              />
            </Box>
            <Box
              p={{ base: '12px', md: '18px' }}
              bg="primary"
              color="white"
              w="full"
              position="absolute"
              bottom={0}
            >
              <Text fontSize="12px" mb="12px">
                {formatedDate}
              </Text>
              <Text as={NextLink} href={link || ''} fontSize="18px">
                {title}
              </Text>
            </Box>
          </VStack>
        </Box>

        <Flex flexDirection={{ base: 'column' }} w="100%" gap="30px">
          {news.slice(1).map(({ id, title, date, link }) => {
            const formatedDate = moment(date).format('DD.MM.YYYY');
            console.log('link',link)
            return (
              <VStack
                gap="12px"
                alignItems="flex-start"
                py="18px"
                w="full"
                h="full"
                borderTop="2px"
                borderColor="blueGrey"
                key={id}
              >
                <Text color="grey" fontSize="12px">
                  {formatedDate}
                </Text>
                {link ? (
                  <Link fontSize="18px" as={NextLink} href={link}>
                    {title}
                  </Link>
                ) : (
                  <Text fontSize="18px">{title}</Text>
                )}
              </VStack>
            );
          })}
        </Flex>
      </Flex>

      <HStack justifyContent={{ base: 'center', md: 'flex-start' }} mt="18px">
        <Link
          as={NextLink}
          color="primary"
          href={`/blog`}
          mb="22px"
          display="flex"
          alignItems="center"
          gap="8px"
          position="relative"
          _hover={{ textDecoration: 'none' }}
        >
          Все новости
          <IoIosArrowRoundForward />
        </Link>
      </HStack>
    </MainContainer>
  );
};
