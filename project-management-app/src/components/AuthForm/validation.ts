import * as yup from 'yup';

export const schemaRegistration = yup.object().shape({
  name: yup.string().required('Name is required.'),
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
  confirmPassword: yup
    .string()
    .required('Please, confirm the password')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

export const schemaLogin = yup.object().shape({
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
