/* eslint-disable @next/next/no-html-link-for-pages */
import { ProtectedRoute } from '@/app/providers/protectedProvider';
import { LayoutProps } from '@/shared/types/pageWithLayouts';
import {
  Box,
  Button,
  ChakraProvider,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react';
import NextLink from 'next/link';

const adminUrl = '/admin';

const adminsMenu = [
  {
    title: 'Посты',
    href: adminUrl + '/posts',
  },
  {
    title: 'Новости',
    href: adminUrl + '/news',
  },
  {
    title: 'api Водоход',
    href: adminUrl + '/vodohod',
  },
];

const AdminLayout: LayoutProps = ({ children }) => {
  return (
    <ProtectedRoute>
      <ChakraProvider>
        <HStack w="full" h="full">
          <VStack w="200px" bg="gray.600" h="full" py="20px" color="white">
            {adminsMenu.map(({ title, href }) => (
              <Text
                key={title}
                as={NextLink}
                href={href}
                p="12px"
                w="full"
                textAlign="center"
                _hover={{ bg: 'gray.800' }}
              >
                {title}
              </Text>
            ))}
          </VStack>
          <VStack flex={1} h="full">
            <Box px={4} py={4} w="100%" h="100%">
              {children}
            </Box>
          </VStack>
        </HStack>
      </ChakraProvider>
    </ProtectedRoute>
  );
};
export default AdminLayout;
