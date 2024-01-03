import { InputGroup, Input, InputRightElement, Box } from '@chakra-ui/react';
import { FC, ReactNode, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { BiCalendar } from 'react-icons/bi';
import { ru } from 'date-fns/locale';

interface SearchBarInputDateProps {
  placeholder: string;
}

export const SearchBarInputDate: FC<SearchBarInputDateProps> = ({
  placeholder,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  return (
    <Box w="full">
      <DatePicker
        selected={selectedDate}
        onChange={handleChange}
        dateFormat="dd-MM-yyyy"
        showPopperArrow={false}
        customInput={<CustomInput placeholderText={placeholder} />}
        locale={ru}
      />
    </Box>
  );
};

const CustomInput = ({
  value,
  onClick,
  placeholderText,
}: {
  value?: string;
  onClick?: () => void;
  placeholderText: string;
}) => {
  return (
    <InputGroup bg="white" w="full" minW={{ lg: '160px' }} onClick={onClick}>
      <Input
        value={value}
        placeholder={placeholderText}
        borderRadius="none"
        _focusVisible={{ boxShadow: 'none', borderColor: 'inherit' }}
      />
      <InputRightElement>
        <BiCalendar />
      </InputRightElement>
    </InputGroup>
  );
};
