'use client';

import { WhiteTransparent } from '@/shared/ui/whiteTransparent/WhiteTransparent';
import { SearchBar } from '@/features/searchBar';
import { MainContainer } from '@/shared/ui/mainContainer/MainContainer';
import { Box, HStack, Spacer, Text, VStack } from '@chakra-ui/react';
import { CruiseType, ShipsType } from '@/shared/types/prismaResponse';
import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';
import { SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export const HeroBlock = ({
  ships,
  citiesStart,
  citiesEnd,
}: {
  ships: ShipsType[];
  citiesStart: CruiseType[];
  citiesEnd: CruiseType[];
}) => {
  return (
    <>
      <Box
        as="section"
        h={{ lg: '700px' }}
        w="full"
        py={{ base: '20px', lg: '60px' }}
        px={{ base: '20px', md: '0' }}
        position="relative"
        background={`linear-gradient(180deg, rgba(1, 42, 81, 0.70) 27.6%, rgba(255, 255, 255, 0.00) 100%), url("/img/hero_bg.png"), lightgray 50% / cover no-repeat;`}
        bgSize="cover"
      >
        <MainContainer h="100%">
          <VStack h="100%">
            <Swiper
              direction={'vertical'}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination]}
              className="mySwiper"
            >
              <SwiperSlide>Slide 1</SwiperSlide>
              <SwiperSlide>Slide 2</SwiperSlide>
            </Swiper>

            dcdcdc
            {/* <HStack
              justifyContent={{ base: 'center', md: 'space-between' }}
              alignItems="flex-start"
              width="100%"
            >
              <VStack
                gap="30px"
                justifyContent={'end'}
                alignItems={{ base: 'center', md: 'flex-end' }}
                textAlign={{ base: 'center', md: 'inherit' }}
              >
                <WhiteTransparent>
                  <Text
                    fontSize={{ base: '26px', lg: '40px' }}
                    fontWeight="bold"
                    whiteSpace="pre-wrap"
                    color="white"
                    px="30px"
                  >
                    {'ВОЛГО-БАЛТИЙСКИЕ\nПУТЕШЕСТВИЯ'}
                  </Text>
                </WhiteTransparent>
                <WhiteTransparent>
                  <Text
                    fontSize={{ base: '16px', lg: '26px' }}
                    whiteSpace="pre-wrap"
                    color="white"
                    px="30px"
                  >
                    С 2000 года на круизном рынке
                  </Text>
                </WhiteTransparent>
              </VStack>
            </HStack> */}

            {/* <Spacer />
            <SearchBar
              display={{ base: 'none', lg: 'flex' }}
              ships={ships}
              citiesEnd={citiesEnd}
              citiesStart={citiesStart}
            /> */}
          </VStack>
        </MainContainer>
      </Box>
    </>
  );
};
