import { menuList } from '@/shared/constants/menuList';
import { Box, Flex, HStack, Spacer, useMediaQuery } from '@chakra-ui/react';
import NextLink from 'next/link';
import { Link } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { MainContainer } from '@/shared/ui/mainContainer/MainContainer';

import { TopMenuContacts } from './TopMenuContacts';
import { socials } from '@/shared/constants/socialContacts';
import { MobileMenu } from './MobileMenu';
import { AiFillPhone } from 'react-icons/ai';
import { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { Logo } from '@/shared/ui/logo';

export const MenuList = () => {
  const router = useRouter();
  return (
    <>
      {menuList.map((menu) => {
        const isActive = router.pathname === menu.link;

        return (
          <Link
            as={NextLink}
            key={menu.title}
            href={menu.link}

            // borderBottom={isActive ? '3px solid' : 'none'}
            // borderColor="primary"
          >
            {menu.title}
          </Link>
        );
      })}
    </>
  );
};

export const Social = () => {
  return (
    <>
      {socials.map(({ alias, url, Icon }) => {
        return (
          <Link
            key={alias}
            as={NextLink}
            href={url}
            color="primary"
            fontSize="25px"
          >
            <Icon />
          </Link>
        );
      })}
    </>
  );
};

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
    <Box as="header" bg="lightBlue">
      <MainContainer>
        {!isMobile ? (
          <HStack height="65px" gap="10px" px="3" alignContent="center">
            <Logo />
            <MenuList />
            <Spacer />
            <TopMenuContacts />
            <Social />
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
