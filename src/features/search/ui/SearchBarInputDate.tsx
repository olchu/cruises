'use client';

import {
  InputGroup,
  Input,
  InputRightElement,
  Box,
  Text,
} from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { BiCalendar } from 'react-icons/bi';
import { ru } from 'date-fns/locale';
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
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<Date | null>(() => {
    if (router.query[urlParamName])
      return new Date(router.query[urlParamName] as string);
    return null;
  });

  useEffect(() => {
    if (router.query[urlParamName] && selectedDate === null) {
      const currentUrl = new URL(window.location.href);
      currentUrl.searchParams.delete(urlParamName);
      window.history.replaceState(null, '', currentUrl.toString());
    }
  }, [router.query, selectedDate, urlParamName]);

  const handleChange = (date: Date | null) => {
    const currentUrl = new URL(window.location.href);
    setSelectedDate(date);
    if (date) {
      const formattedDate = date.toISOString().split('T')[0];
      currentUrl.searchParams.set(urlParamName, formattedDate);
      window.history.replaceState(null, '', currentUrl.toString());
    }
  };

  return (
    <Box w="full" className="my-datePicker">
      <Text color={{ base: 'text' }} mb="12px">
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
