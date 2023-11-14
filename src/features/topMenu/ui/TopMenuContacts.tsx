import { phones } from '@/shared/constants/contactsPhone';
import { HStack, Link, Text, VStack } from '@chakra-ui/react';
import NextLink from 'next/link';
import { MdOutlinePhoneAndroid } from 'react-icons/md';
import { BiLogoTelegram } from 'react-icons/bi';
import { socials } from '@/shared/constants/socialContacts';

export const TopMenuContacts = () => {
  return (
    <VStack gap="4px" alignContent="center" pr="12px">
      {phones.map((phone) => {
        const link = `tel:${phone}`;
        return (
          <HStack key={phone} as="span">
            <MdOutlinePhoneAndroid />
            <Link as={NextLink} href={link}>
              {phone}
            </Link>
          </HStack>
        );
      })}
    </VStack>
  );
};
