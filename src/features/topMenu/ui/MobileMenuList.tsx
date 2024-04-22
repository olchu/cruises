import { aboutLinks, cruiseLinks, routeCityLinks, saleLinks } from '@/shared/constants/menuList';
import { Link, VStack } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useState } from 'react';

type LinksType = {
  title: string;
  link: string;
};

export const MobileMenuLink = ({
  onClose,
  content,
}: {
  onClose: () => void;
  content: {
    title: string;
    links: LinksType[];
    url: string;
    goToUrl: boolean;
  };
}) => {
  const [isActive, setIsActive] = useState(false);
  const { title, links, url, goToUrl } = content;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (goToUrl) {
      onClose();
      return;
    }
    e.preventDefault();
    setIsActive(!isActive);
  };
  return (
    <VStack alignItems="flex-start" w="full" position="relative">
      <Link
        as={NextLink}
        href={url}
        w="full"
        textAlign="center"
        p="12px 0"
        fontSize="18px"
        onClick={handleClick}
        _hover={{ textDecoration: 'none' }}
      >
        {title}
      </Link>
      <VStack
        alignItems="flex-start"
        w="100vw"
        display={isActive ? 'block' : 'none'}
        bg="lightBlue"
        ml="-12px"
        px="12px"
      >
        {links.map((link) => {
          return (
            <Link
              key={link.title}
              as={NextLink}
              display="block"
              p="12px 0"
              href={link.link}
              onClick={onClose}
              color="primary"
              _hover={{
                textDecoration: 'none',
              }}
            >
              {link.title}
            </Link>
          );
        })}
      </VStack>
    </VStack>
  );
};

export const MobileMenuList = ({ onClose }: { onClose: () => void }) => {
  return (
    <>
      {menulist.map((item) => {
        return (
          <MobileMenuLink key={item.title} content={item} onClose={onClose} />
        );
      })}
    </>
  );
};

const menulist = [
  {
    title: 'Круизы',
    links: cruiseLinks,
    url: '/cruises',
    goToUrl: false,
  },
  {
    title: 'Теплоходы',
    links: [],
    url: '/ships',
    goToUrl: true,
  },
  {
    title: 'Направления',
    links: routeCityLinks,
    url: '/routes',
    goToUrl: false,
  },
  {
    title: 'Скидки',
    links: saleLinks,
    url: '/sales',
    goToUrl: false,
  },
  {
    title: 'О компании',
    links: aboutLinks,
    url: '/about',
    goToUrl: false,
  },
];
