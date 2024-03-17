'use client';
import { CruiseCard } from '@/entities/cruiseCard';
import { CruiseType } from '@/shared/types/prismaResponse';
import { Heading } from '@/shared/ui/heading';
import { Box } from '@chakra-ui/react';
import { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface CruisesCarouselProps {
  cruises: CruiseType[];
}

export const CruisesCarousel: FC<CruisesCarouselProps> = ({ cruises }) => {

  return (
    <Box as="section" py={{ base: '30px', lg: '60px' }} bg="lightBlue" w="100%">
      <Heading mb={{ base: '30px', lg: '60px' }}>Рекомендации</Heading>

      <Swiper
        mousewheel={true}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className="Hswiper"
        breakpoints={{
          300: {
            slidesPerView: 1,
            spaceBetween: 20,
            centeredSlides: true,
          },
          460: {
            slidesPerView: 'auto',
            spaceBetween: 20,
            centeredSlides: false,
          },
        }}
      >
        {cruises.map((cruise) => {
          return (
            <SwiperSlide key={cruise.id}>
              <CruiseCard cruise={cruise} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Box>
  );
};