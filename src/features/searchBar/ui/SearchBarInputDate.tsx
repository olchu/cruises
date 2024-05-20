'use client';

import {
  InputGroup,
  Input,
  InputRightElement,
  Box,
  Text,
} from '@chakra-ui/react';
import { FC, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { BiCalendar } from 'react-icons/bi';
import { ru } from 'date-fns/locale';
import { format } from 'date-fns';
import { useRouter } from 'next/router';

export enum urlParamNames {
  dateStart = 'dateStart',
  dateEnd = 'dateEnd',
}

interface SearchBarInputDateProps {
  placeholder: string;
  urlParamName: urlParamNames;
}

export const SearchBarInputDate: FC<SearchBarInputDateProps> = ({
  placeholder,
  urlParamName,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const router = useRouter();
  const keyParameter =
    urlParamName === urlParamNames.dateStart
      ? urlParamNames.dateStart
      : urlParamNames.dateEnd;

  const handleChange = (date: Date | null) => {
    const currentUrl = new URL(window.location.href);
    setSelectedDate(date);
    if (date) {
      const formattedDate = format(date, 'yyyy-MM-dd');
      router.query = { ...router.query, [keyParameter]: formattedDate };
    }
  };

  return (
    <Box w="full" className="my-datePicker">
      <Text color={{ base: 'primary', lg: 'white' }} mb="12px">
        {placeholder}
      </Text>
      <DatePicker
        selected={selectedDate}
        onChange={handleChange}
        dateFormat="dd-MM-yyyy"
        showPopperArrow={false}
        customInput={<CustomInput placeholderText="Дата" />}
        locale={ru}
        isClearable
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
        color="text"
        _placeholder={{ color: 'text' }}
      />
      {!value && (
        <InputRightElement>
          <BiCalendar />
        </InputRightElement>
      )}
    </InputGroup>
  );
};
