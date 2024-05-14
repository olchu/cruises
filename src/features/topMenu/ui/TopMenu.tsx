import {
  Box,
  Flex,
  HStack,
  Spacer,
  Text,
  useMediaQuery,
} from '@chakra-ui/react';
import { MainContainer } from '@/shared/ui/mainContainer/MainContainer';
import { MobileMenu } from './MobileMenu';
import { AiFillPhone } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { Logo } from '@/shared/ui/logo';
import { CiSearch } from 'react-icons/ci';

import { MenuList } from './MenuList';
import Link from 'next/link';

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
    <Box
      as="header"
      bg="lightBlue"
      position={{ base: 'sticky', md: 'relative' }}
      top={{ base: 0, md: 'inherit' }}
      zIndex={{ base: 1000, md: 'inherit' }}
      boxShadow={{
        base: '0px 4px 16px 0px rgba(0, 0, 0, 0.05)',
        md: 'inherit',
      }}
    >
      <MainContainer>
        {!isMobile ? (
          <HStack height="65px" gap="20px" px="3" alignContent="center">
            <MenuList />
            <Spacer />
          </HStack>
        ) : (
          <HStack bg="white" height="60px" gap="10px" alignContent="center">
            <MobileMenu />
            <Logo />

            <Spacer />

            <Spacer />
            <Flex
              as={Link}
              href="/search"
              height="100%"
              alignItems="center"
              justifyContent="center"
              fontSize="20px"
              color="primary"
            >
              <Text mr="6px">Поиск</Text>
              <CiSearch />
            </Flex>
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
