import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  VStack,
  Spacer,
  useDisclosure,
  Flex,
  Text,
  Box,
  Link,
  HStack,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { GrMenu } from 'react-icons/gr';
import { IoClose } from 'react-icons/io5';
import { phones } from '@/shared/constants/contactsPhone';
import { MdOutlinePhoneAndroid } from 'react-icons/md';
import { socials } from '@/shared/constants/socialContacts';
import { pagesLink } from '@/shared/constants/pagesLink';

const menuList = [
  {
    title: 'Круизы',
    link: pagesLink.contacts,
  },
  {
    title: 'Теплоходы',
    link: pagesLink.contacts,
  },
  {
    title: 'Направления',
    link: pagesLink.contacts,
  },
  {
    title: 'Скидки',
    link: pagesLink.contacts,
  },
  {
    title: 'Полезная информация',
    link: pagesLink.contacts,
  },
  {
    title: 'О компании',
    link: pagesLink.contacts,
  },
  {
    title: 'Поиск',
    link: pagesLink.search,
  },
];

export const MobileMenu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex
        as="button"
        width="60px"
        height="100%"
        alignItems="center"
        justifyContent="center"
        fontSize="30px"
        onClick={onOpen}
        color="primary"
      >
        <GrMenu />
      </Flex>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="xs">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerBody p={0} display="flex" flexDirection="column">
            <Flex
              display="flex"
              justifyContent="center"
              alignItems="center"
              fontSize="16px"
              fontWeight="bold"
              bg="primary"
              color="white"
              height="60px"
              minH="60px"
            >
              <Text>Волго-Балтийские Путешествия</Text>
            </Flex>
            <Box
              position="absolute"
              height="60px"
              top={0}
              right="-55px"
              w="55px"
              bg="accent"
              display="flex"
              justifyContent="center"
              alignItems="center"
              color="white"
              onClick={onClose}
            >
              <IoClose size="26px" />
            </Box>
            <VStack
              bg="white"
              px="3"
              flex="1"
              alignContent="center"
              justifyContent="stretch"
            >
              {menuList.map((menu) => {
                // const isActive = router.pathname === menu.link;

                return (
                  <Link
                    as={NextLink}
                    key={menu.title}
                    href={menu.link}
                    w="full"
                    textAlign="center"
                    p="12px 0"
                    _hover={{ textDecoration: 'none' }}
                    // borderBottom={isActive ? '3px solid' : 'none'}
                    // borderColor="primary"
                  >
                    {menu.title}
                  </Link>
                );
              })}
              <Spacer />
              <HStack>
                {socials.map(({ alias, url, Icon }) => {
                  return (
                    <Link
                      key={alias}
                      as={NextLink}
                      href={url}
                      color="primary"
                      fontSize="25px"
                      p="12px"
                    >
                      <Icon />
                    </Link>
                  );
                })}
              </HStack>
              {phones.map((phone) => {
                const link = `tel:${phone}`;
                return (
                  <HStack key={phone} as="span" p="12px">
                    <MdOutlinePhoneAndroid />
                    <Link as={NextLink} href={link}>
                      {phone}
                    </Link>
                  </HStack>
                );
              })}
              {/* <Text
                p="12px"
                whiteSpace="pre-wrap"
                w="full"
                textAlign="center"
              >{`Москва, улица Лесная,\nд.43, офис 238`}</Text> */}

              <Flex justifyContent="center">
                <iframe
                  src="https://yandex.ru/sprav/widget/rating-badge/1079535152?type=rating"
                  width="150"
                  height="50"
                  frameBorder="0"
                ></iframe>
              </Flex>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
