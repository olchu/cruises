/* eslint-disable @next/next/no-html-link-for-pages */
import { LayoutProps } from '@/types/pageWithLayouts';
import { Box, Button, ChakraProvider } from '@chakra-ui/react';

const adminUrl = '/admin';

const adminsMenu = [
  {
    title: 'Главная',
    href: adminUrl,
  },
  {
    title: 'api Водоход',
    href: adminUrl + '/vodohod',
  },
];

const AdminLayout: LayoutProps = ({ children }) => {
  return (
    <ChakraProvider>
      <Box bg="gray.50" w="100%" px={4} py={4} color="gray.30">
        <div>
          {adminsMenu.map(({ title, href }) => (
            <Button key={title} as="a" href={href} marginRight={4}>
              {title}
            </Button>
          ))}
        </div>
      </Box>

      <Box px={4} py={4} w="100%" h="100%">
        {children}
      </Box>
    </ChakraProvider>
  );
};
export default AdminLayout;
