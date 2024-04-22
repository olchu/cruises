import { Box, Flex, HStack, Spacer, useMediaQuery } from '@chakra-ui/react';
import { MainContainer } from '@/shared/ui/mainContainer/MainContainer';
import { MobileMenu } from './MobileMenu';
import { AiFillPhone } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { Logo } from '@/shared/ui/logo';

import { MenuList } from './MenuList';

// const MenuList = dynamic(() => import('./MenuList'), {
//   ssr: false,
// });

interface TopMenuProps {
  isMobileDevice?: boolean;
}

export const TopMenu = ({ isMobileDevice }: TopMenuProps) => {
  const [isMatchMedia] = useMediaQuery('(max-width: 1060px)');
  const [isMobile, setIsMobile] = useState(isMobileDevice);

  useEffect(() => {
    setIsMobile(isMatchMedia);
  }, [isMatchMedia]);

  return (
    <Box as="header" bg="lightBlue" position="relative">
      <MainContainer>
        {!isMobile ? (
          <HStack height="65px" gap="20px" px="3" alignContent="center">
            <MenuList />
            <Spacer />
          </HStack>
        ) : (
          <HStack
            bg="white"
            height="60px"
            gap="10px"
            alignContent="center"
            boxShadow="0px 4px 16px 0px rgba(0, 0, 0, 0.05)"
          >
            <MobileMenu />
            <Spacer />
            <Logo />
            <Spacer />
            <Flex
              as="a"
              href="tel:+74955439463"
              width="60px"
              height="100%"
              bg="blueGrey"
              alignItems="center"
              justifyContent="center"
              fontSize="30px"
            >
              <AiFillPhone />
            </Flex>
          </HStack>
        )}
      </MainContainer>
    </Box>
  );
};
