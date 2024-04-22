import { MainContainer } from '@/shared/ui/mainContainer/MainContainer';
import { Box } from '@chakra-ui/react';
import { MouseEvent, useState } from 'react';

export const LinkItem = ({
  children,
  name,
  link,
}: {
  name: string;
  children: React.ReactNode;
  link: string;
}) => {
  const [isShowSub, setIsShowSub] = useState(false);
  return (
    <Box
      onMouseEnter={() => setIsShowSub(true)}
      onMouseLeave={() => setIsShowSub(false)}
      h="full"
      zIndex={10}
    >
      <Box
        h="full"
        display="flex"
        alignItems="center"
        fontSize="20px"
        color="primary"
        px="12px"
        as="a"
        href={link}
        onClick={(e: MouseEvent) => {
          e.preventDefault();
        }}
        cursor="pointer"
        boxShadow={isShowSub ? 'inset 0px -4px #165D9F' : 'none'}
        _hover={{
          color: 'blue',
          boxShadow: 'inset 0px -4px #165D9F',
        }}
      >
        {name}
      </Box>

      <Box
        display={isShowSub ? 'block' : 'none'}
        position="absolute"
        width="full"
        bg="white"
        left="0"
        top="65px"
        zIndex="2"
        boxShadow="md"
      >
        <MainContainer
          h="full"
          gap="12px"
          display="flex"
          flexDirection="column"
          py="12px"
          px="3"
        >
          {children}
        </MainContainer>
      </Box>
    </Box>
  );
};
