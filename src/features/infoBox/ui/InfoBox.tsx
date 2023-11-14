import { WhiteTransparent } from '@/shared/ui/whiteTransparent/WhiteTransparent';
import { BoxProps, Text, VStack } from '@chakra-ui/react';
import { FC } from 'react';

interface InfoBox {
  img: string;
  title: string;
  description: string;
  url: string;
}

export const InfoBox: FC<BoxProps & InfoBox> = (props) => {
  const { img, title, description, url } = props;
  return (
    <VStack
      as="a"
      h="full"
      background={`linear-gradient(180deg, rgba(0, 0, 0, 0.00) 47.4%, rgba(27, 27, 27, 0.80) 80.73%), url(${img}), lightgray -9.073px -107.11px / 102.781% 148.729% no-repeat;`}
      bgSize="cover"
      bgPosition="center"
      px="12px"
      py="20px"
      alignItems="flex-end"
      justifyContent="space-between"
      href={url}
      {...props}
    >
      <WhiteTransparent>
        <Text
          fontSize="18px"
          p="8px"
          fontWeight="bold"
          color="primary"
          textAlign="center"
        >
          {title}
        </Text>
      </WhiteTransparent>
      <Text
        color="white"
        w="full"
        fontWeight="bold"
        fontSize="20px"
        textAlign="center"
      >
        {description}
      </Text>
    </VStack>
  );
};
