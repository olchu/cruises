import { WhiteTransparent } from '@/entities/whiteTransparent/WhiteTransparent';
import { SearchBar } from '@/features/searchBar';
import { useMedia } from '@/shared/hooks/useMedia';
import { MainContainer } from '@/shared/ui/mainContainer/MainContainer';
import { Box, HStack, Spacer, Text, VStack } from '@chakra-ui/react';
import bg from '../lib/assets/hero_bg.png';

export const HeroBlock = () => {
  const isShowMobile = useMedia('(max-width: 1060px)');
  return (
    <Box
      as="section"
      h="534px"
      w="full"
      py="60px"
      position="relative"
      background={`linear-gradient(180deg, rgba(1, 42, 81, 0.70) 27.6%, rgba(255, 255, 255, 0.00) 100%), url(${bg.src}), lightgray 50% / cover no-repeat;`}
      bgSize="cover"
    >
      <MainContainer h="100%">
        <VStack h="100%">
          <HStack
            justifyContent="space-between"
            alignItems="flex-start"
            width="100%"
          >
            <VStack gap="30px" justifyContent="end" alignItems="flex-end">
              <WhiteTransparent>
                <Text
                  fontSize="40px"
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
                  fontSize="26px"
                  whiteSpace="pre-wrap"
                  color="white"
                  px="30px"
                >
                  С 2000 года на круизном рынке
                </Text>
              </WhiteTransparent>
            </VStack>

            <WhiteTransparent>
              <Text
                fontSize="40px"
                fontWeight="bold"
                whiteSpace="pre-wrap"
                color="white"
                px="30px"
              >
                2263
              </Text>
              <Text fontSize="20px" fontWeight="bold" color="white">
                всего круизов
              </Text>
            </WhiteTransparent>
          </HStack>
          <Spacer />
          <SearchBar />
        </VStack>
      </MainContainer>
    </Box>
  );
};
