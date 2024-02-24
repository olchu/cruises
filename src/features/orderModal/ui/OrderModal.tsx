import { CruiseType } from '@/shared/types/prismaResponse';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  Textarea,
  Text,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Box,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';

type OrderModalProp = {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  chooseCabins: string[];
  cruise: CruiseType | null;
};

type FormType = {
  name: string;
  phone: string;
  email: string;
  message: string;
};

const phoneRegExp: RegExp =
  /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
const emailRegExp: RegExp =
  /^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/u;

const FormSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Минимум 3 символа')
    .required('Это поле обязательное'),
  phone: Yup.string()
    .required('Это поле обязательное')
    .matches(phoneRegExp, 'Не похоже на на номер телефона'),
  email: Yup.string()
    .email('Не похоже на почту')
    .matches(emailRegExp, 'Не похоже на почту')
    .required('Это поле обязательное'),
});

export const OrderModal = ({
  isOpen,
  onClose,
  onOpen,
  chooseCabins,
  cruise,
}: OrderModalProp) => {
  const [successModal, setSuccessModal] = useState(false);

  const {
    handleSubmit,
    handleChange,
    values,
    resetForm,
    setFieldValue,
    isSubmitting,
    errors,
  } = useFormik<FormType>({
    initialValues: {
      name: '',
      phone: '',
      email: '',
      message: '',
    },
    validationSchema: FormSchema,
    onSubmit: async (values) => {
      const resp = await fetch('/api/order', {
        method: 'POST',
        body: JSON.stringify({ fields: values, cruise, chooseCabins }),
      });
      const { status } = await resp.json();
      if (status === 'OK') {
        handleClose();
        setSuccessModal(true);
      }
    },
  });

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <>
      <Modal isOpen={successModal} onClose={() => setSuccessModal(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            Ваша заявка отправлена. Ожидайте звонка менеджера
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Оформление заявки</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box
              as="form"
              onSubmit={handleSubmit}
              gap="12px"
              display="flex"
              flexDirection="column"
            >
              <FormControl>
                <FormLabel>Имя</FormLabel>
                <Input
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  isInvalid={Boolean(errors.name)}
                  _invalid={{
                    boxShadow: 'none',
                    borderColor: 'accent',
                  }}
                />
                {errors.name && (
                  <FormHelperText color="accent">{errors.name}</FormHelperText>
                )}
              </FormControl>

              <FormControl>
                <FormLabel>Телефон</FormLabel>
                <Input
                  name="phone"
                  value={values.phone}
                  type="number"
                  onChange={handleChange}
                  isInvalid={Boolean(errors.phone)}
                  _invalid={{
                    boxShadow: 'none',
                    borderColor: 'accent',
                  }}
                />
                {errors.name && (
                  <FormHelperText color="accent">{errors.phone}</FormHelperText>
                )}
              </FormControl>

              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  isInvalid={Boolean(errors.email)}
                  _invalid={{
                    boxShadow: 'none',
                    borderColor: 'accent',
                  }}
                />
                {errors.name && (
                  <FormHelperText color="accent">{errors.email}</FormHelperText>
                )}
              </FormControl>

              <FormControl>
                <FormLabel>Комментарий</FormLabel>
                <Textarea
                  name="message"
                  value={values.message}
                  onChange={handleChange}
                />
              </FormControl>

              <Text color="grey">
                Вы выбрали каюты - {chooseCabins.join(', ')}
              </Text>
              <HStack justifyContent="stretch" gap="12px" my="12px">
                <Button w="full">Отменить</Button>
                <Button
                  w="full"
                  bg="primary"
                  color="white"
                  type="submit"
                  isLoading={isSubmitting}
                >
                  Отправить
                </Button>
              </HStack>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
