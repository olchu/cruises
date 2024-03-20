import { phones } from '@/shared/constants/contactsPhone';
import { SocialLinks } from '@/shared/ui/socialLinks';
import { Box, HStack, Link, Spacer, Text } from '@chakra-ui/react';
import { MdOutlinePhoneAndroid } from 'react-icons/md';
import { MainContainer } from '../../../shared/ui/mainContainer/MainContainer';
import NextLink from 'next/link';

export const ContactsTopMenu = () => {
  return (
    <HStack
      bgColor="primary"
      color="white"
      display={{ base: 'none', lg: 'flex' }}
    >
      <MainContainer display="flex" alignItems="center" gap="20px" py="12px" px="3">
        <Text
          fontSize="24px"
          fontWeight="bold"
          whiteSpace="pre-wrap"
          textAlign="center"
          lineHeight="20px"
        >
          {`Волго-Балтийские\nПутешествия`}
        </Text>
        <Spacer />
        <HStack gap="24px" alignContent="center" pr="12px" fontSize="22px">
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
        </HStack>
        <Spacer />
        <Text
          whiteSpace="pre-wrap"
          textAlign="center"
        >{`м.Белорусская\nЛесная 43, офис 238`}</Text>

        <SocialLinks color="white" />
      </MainContainer>
    </HStack>
  );
};
