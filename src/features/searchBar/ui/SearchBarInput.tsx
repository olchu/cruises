import { InputGroup, Input, InputRightElement } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';

interface SearchBarInputProps {
  icon: ReactNode;
  placeholder: string;
  type?: string;
}

export const SearchBarInput: FC<SearchBarInputProps> = (props) => {
  const { icon, placeholder, type } = props;
  return (
    <InputGroup bg="white" w="full" minW={{ lg: '160px' }}>
      <Input
        placeholder={placeholder}
        type={type}
        borderRadius="none"
        _focusVisible={{ boxShadow: 'none', borderColor: 'inherit' }}
      />
      <InputRightElement>{icon}</InputRightElement>
    </InputGroup>
  );
};
