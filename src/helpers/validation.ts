import * as yup from 'yup'

// Error strings
const noFirstName = 'First Name is Required'

const noLastName = 'Last Name is Required'

const invalidEmail = 'Email must be Valid'
const noEmail = 'Email is Required'

const noPassword = 'Password is Required'
const shortPassword = 'Password must be at least 5 characters'

const noConfirmPassword = 'You must confirm your password'
const invalidConfirmPassword = 'Passwords must match'

// Individual field rules
const firstNameValidation = yup.string().required(noFirstName)

const lastNameValidation = yup.string().required(noLastName)

const emailValidation = yup
  .string()
  .email(invalidEmail)
  .required(noEmail)

const passwordValidation = yup
  .string()
  .min(5, shortPassword)
  .max(25)
  .required(noPassword)

const confirmPasswordValidation = yup
  .string()
  .oneOf([yup.ref('password'), null], invalidConfirmPassword)
  .required(noConfirmPassword)

// Schema for Signing Up
export const registerSchema = yup.object().shape({
  firstName: firstNameValidation,
  lastName: lastNameValidation,
  email: emailValidation,
  password: passwordValidation,
  confirmPassword: confirmPasswordValidation,
})
