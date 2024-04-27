import {
  aboutLinks,
  cruiseLinks,
  infoLinks,
  saleLinks,
} from '@/shared/constants/menuList';
import { Link, Box } from '@chakra-ui/react';
import NextLink from 'next/link';
import { LinkItem } from './LinkItem';
import { ShipsList } from '@/entities/shipsList';
import { RoutesList } from '@/entities/routesList/ui/RoutesList';
import shipList from '../../../../public/ships.json';

export const MenuList = () => {
  return (
    <>
      <LinkItem link="/cruises" name="Круизы">
        <Box
          flexWrap="wrap"
          columnGap="20px"
          width="100%"
          sx={{
            columns: { base: 1, md: 2 },
          }}
        >
          {cruiseLinks.map((link) => {
            return (
              <Link
                key={link.title}
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
                }}
              >
                {link.title}
              </Link>
            );
          })}
        </Box>
      </LinkItem>

      <LinkItem link="/ships" name="Теплоходы">
        <ShipsList ships={shipList} />
      </LinkItem>

      <LinkItem link="/routes" name="Направления">
        <RoutesList />
      </LinkItem>

      <LinkItem link="/sales" name="Скидки">
        {saleLinks.map((link) => {
          return (
            <Link
              key={link.title}
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
              }}
            >
              {link.title}
            </Link>
          );
        })}
      </LinkItem>

      <LinkItem link="/info" name="Полезная информация">
        {infoLinks.map((link) => {
          return (
            <Link
              key={link.title}
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
              }}
            >
              {link.title}
            </Link>
          );
        })}
      </LinkItem>

      <LinkItem link="/about" name="О компании">
        {aboutLinks.map((link) => {
          return (
            <Link
              key={link.title}
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
              }}
            >
              {link.title}
            </Link>
          );
        })}
      </LinkItem>
      <Link
        as={NextLink}
        display="flex"
        alignItems="center"
        href="/search"
        fontSize="20px"
        color="primary"
        _hover={{
          textDecoration: 'none',
          color: 'blue',
        }}
      >
        Поиск
      </Link>
    </>
  );
};
