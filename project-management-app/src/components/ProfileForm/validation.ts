import * as yup from 'yup';

export const schemaRegistration = yup.object().shape({
  name: yup
    .string()
    .required('Name is required.')
    .min(2, 'Name is too short - should be 2 chars minimum.'),
  login: yup
    .string()
    .required('Login is required.')
    .min(3, 'Login is too short - should be 3 chars minimum.')
    .matches(/[a-zA-Z]/, 'Login can only contain Latin letters.'),
  password: yup
    .string()
    .required('Password is required.')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .max(32)
    .matches(/[a-zA-Z0-9]/, 'Password can only contain Latin letters and numbers.'),
});
