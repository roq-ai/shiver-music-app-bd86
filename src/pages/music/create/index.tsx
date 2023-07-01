import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createMusic } from 'apiSdk/music';
import { Error } from 'components/error';
import { musicValidationSchema } from 'validationSchema/music';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { RoomInterface } from 'interfaces/room';
import { getRooms } from 'apiSdk/rooms';
import { MusicInterface } from 'interfaces/music';

function MusicCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: MusicInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createMusic(values);
      resetForm();
      router.push('/music');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<MusicInterface>({
    initialValues: {
      name: '',
      platform: '',
      room_id: (router.query.room_id as string) ?? null,
    },
    validationSchema: musicValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Music
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="name" mb="4" isInvalid={!!formik.errors?.name}>
            <FormLabel>Name</FormLabel>
            <Input type="text" name="name" value={formik.values?.name} onChange={formik.handleChange} />
            {formik.errors.name && <FormErrorMessage>{formik.errors?.name}</FormErrorMessage>}
          </FormControl>
          <FormControl id="platform" mb="4" isInvalid={!!formik.errors?.platform}>
            <FormLabel>Platform</FormLabel>
            <Input type="text" name="platform" value={formik.values?.platform} onChange={formik.handleChange} />
            {formik.errors.platform && <FormErrorMessage>{formik.errors?.platform}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<RoomInterface>
            formik={formik}
            name={'room_id'}
            label={'Select Room'}
            placeholder={'Select Room'}
            fetcher={getRooms}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'music',
    operation: AccessOperationEnum.CREATE,
  }),
)(MusicCreatePage);
