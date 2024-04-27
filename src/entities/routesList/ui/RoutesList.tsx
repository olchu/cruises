import {
    routeCityLinks,
    routeCompileLinks
} from '@/shared/constants/menuList';
import { Box, Link, Text } from '@chakra-ui/react';
import NextLink from 'next/link';

export const RoutesList = () => {
  return (
    <Box
      flexWrap="wrap"
      columnGap="20px"
      h="full"
      width="100%"
      sx={{
        columns: { base: 1, md: 4 },
      }}
    >
      <Box>
        <Text fontWeight="bold" fontSize="20px" color="primary">
          По городам отправления
        </Text>
        {routeCityLinks.map((link) => {
          return (
            <Link
              pl="8px"
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
      <Text fontWeight="bold" fontSize="20px" color="#81520b">
        Подборки
      </Text>
      {routeCompileLinks.map((link) => {
        return (
          <Link
            pl="8px"
            key={link.title}
            as={NextLink}
            h="full"
            display="flex"
            alignItems="center"
            href={link.link}
            fontSize="20px"
            color="#81520b"
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
  );
};
