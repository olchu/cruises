'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { MainContainer } from '@/shared/ui/mainContainer/MainContainer';
import { Box, Heading, VStack } from '@chakra-ui/react';
import {
  CruiseType,
  HeroPrismaType,
  ShipsType,
} from '@/shared/types/prismaResponse';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Link from 'next/link';

export const HeroBlock = ({ heroList }: { heroList: HeroPrismaType[] }) => {
  const [swiper, setSwiper] = useState<any>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);

  useEffect(() => {
    if (swiper) {
      swiper.on('slideChange', () => {
        setActiveSlideIndex(swiper.realIndex);
      });
    }
  }, [swiper]);

  const handlePaginationClick = (index: number) => {
    if (swiper && swiper.slideTo) {
      swiper.slideTo(index);
    }
  };
  return (
    <Box
      h={{ base: '200px', md: '400px', lg: '700px' }}
      w="full"
      overflow="hidden"
      position="relative"
    >
      <Swiper
        mousewheel={false}
        modules={[Autoplay, Pagination, Navigation]}
        className="Heroswiper"
        onSwiper={setSwiper}
        simulateTouch={false}
        loop={true}
        autoplay={{
          delay: 8000,
          disableOnInteraction: false,
        }}
      >
        {heroList.map(({ id, title, img, link }) => {
          return (
            <SwiperSlide key={id}>
              <Box position="relative">
                <Link href={link}>
                  <Box
                    position="relative"
                    _after={{
                      content: "''",
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      display: 'block',
                      background: `linear-gradient(90deg, rgb(0 47 91 / 72%) 27.6%, rgba(255, 255, 255, 0.00) 100%);`,
                    }}
                    h={{ base: '200px', md: '400px', lg: '700px' }}
                  >
                    <Image
                      src={img}
                      alt={title}
                      fill={true}
                      style={{ objectFit: 'cover' }}
                    />
                  </Box>
                  <Box w="full" position="absolute" top="0" left="0" h="full">
                    <MainContainer
                      my={'auto'}
                      maxW={'1400px'}
                      px={{ base: 'section.mobile', lg: 'section.desktop' }}
                      py={{ base: '30px', md: '70px', lg: '100px' }}
                      whiteSpace="pre-wrap"
                    >
                      <Heading
                        as="h2"
                        fontSize={{ base: '30px', md: '50px', lg: '60px' }}
                        color="white"
                        fontWeight="900"
                        w={{ base: '100%', md: '70%', lg: '70%' }}
                      >
                        {title.replace(/\\n/g, '\n')}
                      </Heading>
                    </MainContainer>
                  </Box>
                </Link>
              </Box>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <VStack
        className="custom-pagination"
        position="absolute"
        top="50%"
        right="20px"
        transform="translateY(-50%)"
        zIndex={1}
      >
        {heroList.length > 1 &&
          heroList.map((_, index) => (
            <Box
              as="span"
              key={index}
              p="6px"
              bg={activeSlideIndex === index ? 'primary' : 'white'}
              border={activeSlideIndex === index ? '"1px solid"' : 'none'}
              borderColor={activeSlideIndex === index ? 'white' : 'inherit'}
              onClick={() => handlePaginationClick(index)}
              opacity="0.7"
              cursor="pointer"
            />
          ))}
      </VStack>
    </Box>
  );
};
