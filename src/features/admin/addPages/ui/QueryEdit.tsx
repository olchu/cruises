import {
  SearchBarInputDate,
  urlParamNames,
} from '@/features/searchBar/ui/SearchBarInputDate';
import { SearchBarSelect } from '@/features/searchBar/ui/SearchBarSelect';
import { AdminPagesContext } from '@/pages/admin/pages';
import { TagPrismaType } from '@/shared/types/prismaResponse';
import { Box, Button, HStack, Input, VStack, Text } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { Dispatch, SetStateAction, useContext } from 'react';
import { BiSolidShip } from 'react-icons/bi';
import { IoLocationSharp } from 'react-icons/io5';

type FormikQueryEditType = {
  name: string;
  value: string;
  content: string;
};

export const QueryEdit = ({
  query,
  setQuery,
}: {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
}) => {
  const { ships, citiesStart, citiesEnd } = useContext(AdminPagesContext);

  // const {
  //   handleSubmit,
  //   handleChange,
  //   values,
  //   resetForm,
  //   setFieldValue,
  //   isSubmitting,
  // } = useFormik<FormikQueryEditType>({
  //   initialValues: {
  //     // name: tag?.key.name || '',
  //     // value: tag?.key.val || '',
  //     // content: tag?.content || '',
  //   },
  //   onSubmit: async (values) => {},
  // });
  return (
    <Box>
      {/* <form onSubmit={handleSubmit}> */}
      <Text fontWeight="bold" mt="30px">
        Формирование запроса
      </Text>
      <VStack gap="18px" w="full" alignItems="none">
        <HStack gap="18px">
          <SearchBarInputDate
            placeholder="Отправление не ранее "
            urlParamName={urlParamNames.dateStart}
          />
          <SearchBarInputDate
            placeholder="Прибытие не ранее"
            urlParamName={urlParamNames.dateEnd}
          />
          <SearchBarSelect
            icon={<BiSolidShip />}
            placeholder="Теплоход"
            searchParamName="ship"
          >
            {ships &&
              ships.map((ship) => {
                return (
                  <option key={ship.id} value={ship.id}>
                    {ship.name}
                  </option>
                );
              })}
          </SearchBarSelect>
          <SearchBarSelect
            placeholder="От куда"
            icon={<IoLocationSharp />}
            searchParamName="cityFrom"
          >
            {citiesStart &&
              citiesStart.map((city) => {
                return (
                  <option key={city.cityStart} value={city.cityStart}>
                    {city.cityStart}
                  </option>
                );
              })}
          </SearchBarSelect>
          <SearchBarSelect
            placeholder="Куда"
            icon={<IoLocationSharp />}
            searchParamName="cityEnd"
          >
            {citiesEnd &&
              citiesEnd.map((city) => {
                return (
                  <option key={city.cityEnd} value={city.cityEnd}>
                    {city.cityEnd}
                  </option>
                );
              })}
          </SearchBarSelect>
        </HStack>
        <Text>query = {query}</Text>

        <Button type="submit">Добавить</Button>
      </VStack>
      {/* </form> */}
    </Box>
  );
};
