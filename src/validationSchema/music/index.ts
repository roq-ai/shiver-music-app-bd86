import * as yup from 'yup';

export const musicValidationSchema = yup.object().shape({
  name: yup.string().required(),
  platform: yup.string().required(),
  room_id: yup.string().nullable().required(),
});
