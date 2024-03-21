import {
  aboutLinks,
  cruiseLinks,
  infoLinks,
  saleLinks,
} from '@/shared/constants/menuList';
import { Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import { LinkItem } from './LinkItem';
import { ShipsList } from '@/entities/shipsList';
import shipsData from '../../../../public/ships.json';
import { RoutesList } from '@/entities/routesList/ui/RoutesList';

export const MenuList = () => {
  return (
    <>
      <LinkItem name="Круизы">
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
      </LinkItem>

      <LinkItem name="Теплоходы">
        <ShipsList ships={shipsData} />
      </LinkItem>

      <LinkItem name="Направления">
        <RoutesList />
      </LinkItem>

      <LinkItem name="Скидки">
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

      <LinkItem name="Полезная информация">
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

      <LinkItem name="О компании">
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
    </>
  );
};
