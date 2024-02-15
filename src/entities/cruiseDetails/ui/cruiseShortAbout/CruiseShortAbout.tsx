import { CruiseType } from '@/shared/types/prismaResponse';
import { Text, Box, VStack, TextProps, Link, Stack } from '@chakra-ui/react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { FaArrowRightLong } from 'react-icons/fa6';

const Title = ({ children }: { children: string }) => {
  return (
    <Text fontSize="sm" color="grey">
      {children}
    </Text>
  );
};

const Description = ({ children, ...props }: TextProps) => {
  return (
    <Text fontSize="lg" fontWeight="bold" {...props}>
      {children}
    </Text>
  );
};

export const CruiseShortAbout = ({ cruise }: { cruise: CruiseType | null }) => {
  const formatedStart = format(cruise?.dateStart!, 'dd MMMM yyyy', {
    locale: ru,
  });
  const dayOfWeekStart = format(cruise?.dateStart!, 'EE', {
    locale: ru,
  });
  const formatedEnd = format(cruise?.dateEnd!, 'dd MMMM yyyy', {
    locale: ru,
  });
  const dayOfWeekEnd = format(cruise?.dateEnd!, 'EE', {
    locale: ru,
  });

  return (
    <Box
      bg="white"
      p={{ base: 'section.mobile', md: 'section.desktop' }}
      minW={{ base: 'full', lg: '950px' }}
      mt="-30px"
      mb="30px"
      boxShadow="md"
      color="text"
    >
      <Stack
        direction={{ base: 'column', md: 'row' }}
        gap="20px"
        alignItems="flex-start"
        justifyContent="space-between"
      >
        <VStack gap="20px" alignItems="flex-start" flex="1">
          <Box>
            <Title>Даты</Title>
            <Description>
              {formatedStart} ({dayOfWeekStart}){' '}
              <Text as="span" fontSize="sm" fontWeight="normal">
                {' — '}
                {cruise?.days} дней {' — '}
              </Text>{' '}
              {formatedEnd} ({dayOfWeekEnd})
            </Description>
          </Box>
          <Box>
            <Title>Маршрут</Title>
            <Description display="flex" alignItems="center" fontSize="md">
              {cruise?.cityStart}
              <Text as="span" mx="10px">
                <FaArrowRightLong size="12px" />
              </Text>
              {cruise?.cityEnd}
            </Description>
            <Text maxWidth="650px" fontSize="12px" fontWeight="400">
              {cruise?.shortRoute}
            </Text>
          </Box>
        </VStack>

        <Box>
          <Title>Теплоход</Title>
          <Description>{cruise?.shipName}</Description>
        </Box>

        <Box>
          <Title>Цена</Title>
          <Text color="accent" fontWeight="bold" fontSize="16px">
            от{' '}
            <Text fontSize="24px" as="span">
              {(cruise?.minDiscountPrice! / 100)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
            </Text>{' '}
            руб./чел
          </Text>
          {cruise?.minDiscountPrice !== cruise?.minPrice && (
            <Text fontSize="12px" fontWeight="normal">
              без скидки{' '}
              <Text as="span" textDecoration="line-through">
                {(cruise?.minPrice! / 100)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}{' '}
                руб./чел
              </Text>
            </Text>
          )}
          <Link
            bg="accent"
            color="white"
            fontWeight="bold"
            h="50px"
            mt="12px"
            href={`#price`}
            alignItems="center"
            justifyContent="center"
            display="flex"
            _hover={{ textDecoration: 'none' }}
          >
            Забронировать
          </Link>
        </Box>
      </Stack>
    </Box>
  );
};
