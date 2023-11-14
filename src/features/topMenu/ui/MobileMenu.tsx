import {
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    DrawerHeader,
    DrawerBody,
    VStack,
    Spacer,
    useDisclosure,
    Button,
    Flex
} from '@chakra-ui/react';
import { MenuList } from './TopMenu';
import { TopMenuContacts } from './TopMenuContacts';
import { GrMenu } from 'react-icons/gr';

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
          <DrawerCloseButton color="white" />
          <DrawerHeader
            display="flex"
            justifyContent="center"
            fontSize="14px"
            bg="primary"
            color="white"
          >
            Волго-Балтийские Путешествия
          </DrawerHeader>

          <DrawerBody>
            <VStack
              bg="white"
              height="65px"
              gap="10px"
              px="3"
              alignContent="center"
            >
              <MenuList />
              <Spacer />
              <TopMenuContacts />
              {/* <Social /> */}
            </VStack>
          </DrawerBody>

          {/* <DrawerFooter>
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="blue">Save</Button>
            </DrawerFooter> */}
        </DrawerContent>
      </Drawer>
    </>
  );
};
