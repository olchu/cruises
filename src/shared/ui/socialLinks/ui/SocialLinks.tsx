import { socials } from '@/shared/constants/socialContacts';
import { HStack, Link } from '@chakra-ui/react';
import NextLink from 'next/link';

export const SocialLinks = ({ color = 'primary' }: { color?: string }) => {
  return (
    <HStack gap="12px">
      {socials.map(({ alias, url, Icon }) => {
        return (
          <Link
            key={alias}
            as={NextLink}
            href={url}
            color={color}
            fontSize="30px"
            rel='nofollow'
          >
            <Icon />
          </Link>
        );
      })}
    </HStack>
  );
};
