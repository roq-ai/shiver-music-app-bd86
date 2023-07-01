import * as yup from 'yup';

export const roomValidationSchema = yup.object().shape({
  name: yup.string().required(),
  company_id: yup.string().nullable().required(),
});
