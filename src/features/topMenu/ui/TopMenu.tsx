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
import { LinkItemType } from '@/shared/types/menuListType';
import { pagesLink } from '@/shared/constants/pagesLink';
import { ShipsList } from '@/entities/shipsList';
import shipsData from '../../../../public/ships.json';

const LinkItem = ({
  link,
  isActive,
}: {
  link: LinkItemType;
  isActive?: boolean;
}) => {
  const [isShowSub, setIsShowSub] = useState(false);

  return (
    <Box
      h="full"
      onMouseEnter={() => setIsShowSub(true)}
      onMouseLeave={() => setIsShowSub(false)}
     
    >
      {link?.sub ? (
        <Box
          as={'div'}
          h="full"
          display="flex"
          alignItems="center"
          fontSize="20px"
          color="primary"
          cursor="pointer"
          _hover={{
            color: 'blue',
            // boxShadow: 'inset 0px -4px #165D9F'
          }}
        >
          {link.title}
        </Box>
      ) : (
        <Link
          as={NextLink}
          h="full"
          display="flex"
          alignItems="center"
          href={link.link}
          fontSize="20px"
          color="primary"
          _hover={{
            textDecoration: 'none',
            color: 'blue',
            // boxShadow: 'inset 0px -4px #165D9F'
          }}
        >
          {link.title}
        </Link>
      )}

      {link?.sub && isShowSub && (
        <Box
          position="absolute"
          width="full"
          bg="white"
          left="0"
          top="65px"
          zIndex="2"
          boxShadow="md"
          p="12px"
        >
          <MainContainer
            h="full"
            pl="115px"
            gap="12px"
            display="flex"
            flexDirection="column"
          >
            {link?.sub?.map((subLink) => {
              return <LinkItem key={subLink.title} link={subLink} />;
            })}
          </MainContainer>
        </Box>
      )}

      {link.link === pagesLink.ships && isShowSub && (
        <Box
          position="absolute"
          width="full"
          bg="white"
          left="0"
          top="65"
          zIndex="3"
          boxShadow="md"
          p="6px"
        >
          <MainContainer
            h="full"
            pl="123px"
            gap="12px"
            display="flex"
            flexDirection="row"
          >
            <ShipsList ships={shipsData} />
          </MainContainer>
        </Box>
      )}
    </Box>
  );
};
export const MenuList = () => {
  const router = useRouter();
  return (
    <HStack gap="20px" h="full">
      {menuList.map((link) => {
        const isActive = router.pathname === link.link;
        return <LinkItem key={link.title} link={link} isActive={isActive} />;
      })}
    </HStack>
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
    <Box as="header" bg="lightBlue" position="relative">
      <MainContainer>
        {!isMobile ? (
          <HStack height="65px" gap="10px" px="3" alignContent="center">
            <Logo />
            <MenuList />
            <Spacer />
            {/* <TopMenuContacts /> */}
            {/* <Social /> */}
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
