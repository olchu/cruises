'use client';

import { useState } from 'react';

import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Box, Image, VStack } from '@chakra-ui/react';
import { domainUrl } from '@/shared/constants/constants';

export const PostimagesGallery = ({ images }: { images: string[] }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  return (
    <Box
      gap="20px"
      w="full"
      height={{ base: 'auto', md: '450px' }}
      overflow="hidden"
    >
      <Swiper
        style={{
          '--swiper-navigation-color': '#073662',
          '--swiper-pagination-color': '#073662',
        }}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
      >
        {images.map((image, id) => {
          return (
            <SwiperSlide key={id}>
              <Image
                mx="auto"
                width={{ base: 'full', md: 'auto' }}
                height={{ base: 'auto', md: '400px' }}
                src={`${domainUrl}${image}`}
                alt=""
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Box w="full" display={{ base: 'none', md: 'block' }}>
        <Swiper
          style={{ marginTop: '20px' }}
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={20}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper"
        >
          {images.map((image, id) => {
            return (
              <SwiperSlide key={id}>
                <Image width="50px" src={`${domainUrl}${image}`} alt="" />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Box>
    </Box>
  );
};
