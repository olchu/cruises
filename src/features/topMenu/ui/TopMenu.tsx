import { menuList } from '@/shared/constants/menuList';
import { HStack } from '@chakra-ui/react';
import NextLink from 'next/link';
import { Link } from '@chakra-ui/react';
import { useRouter } from 'next/router';

export const TopMenu = () => {
  const router = useRouter();

  return (
    <HStack bg="blue.400" height="60px" gap="10px">
      {menuList.map((menu) => {
        const isActive = router.pathname === menu.link;

        return (
          <Link
            as={NextLink}
            key={menu.title}
            href={menu.link}
            color={isActive ? 'red' : 'white'}
          >
            {menu.title}
          </Link>
        );
      })}
    </HStack>
  );
};
