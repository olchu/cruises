'use client';

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
import { RoutesList } from '@/entities/routesList/ui/RoutesList';
import { GroupedShips } from '@/shared/types/shipList';
import axios from 'axios';
import { useState, useLayoutEffect } from 'react';

export const MenuList = () => {
  const [ships, setShips] = useState<GroupedShips | null>(null);

  const getShipsMenu = async () => {
    const { data } = await axios.get('/ships.json');
    console.log('data', data);
    setShips(data);
  };

  useLayoutEffect(() => {
    getShipsMenu();
  }, []);

  return (
    <>
      <LinkItem link="/cruises" name="Круизы">
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

      <LinkItem link="/ships" name="Теплоходы">
        <ShipsList ships={ships} />
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
    </>
  );
};
