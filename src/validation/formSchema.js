import * as yup from "yup";

export const registerFormSchemaPart1 = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Email must be valid"),
  username: yup
    .string()
    .required("Username is Required")
    .min(3, "Username must be at least 3 characters"),
  password: yup
    .string()
    .required("Password is Required")
    .min(7, "Password must be at least 7 characters"),
  first_name: yup.string().required("First Name is Required"),
  last_name: yup.string().required("Last Name is Required"),
  street_address: yup.string().required("Street Address is Required"),
  city: yup.string().required("City is Required"),
  state: yup.string().required("State is Required"),
  zipcode: yup
    .string()
    .required("Zipcode is Required")
    .matches(/^[0-9]+$/, "Must be only digits")
    .test(
      "len",
      "PLease enter a valid zipcode",
      (val) => val.toString().length === 5
    ),
  hourly_rate: yup.string().matches(/^[0-9]+$/, "Must be only digits"),
});

export const loginFormSchema = yup.object().shape({
  username: yup.string().required("Username is Required").min(3),
  password: yup.string().required("Password is Required").min(7),
});

export const forgotPasswordFormSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Email must be valid"),
});

export const updateProfileSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Email must be valid"),
  username: yup
    .string()
    .required("Username is Required")
    .min(3, "Username must be at least 3 characters"),
  first_name: yup.string().required("First Name is Required"),
  last_name: yup.string().required("Last Name is Required"),
  street_address: yup.string().required("Street Address is Required"),
  city: yup.string().required("City is Required"),
  state: yup.string().required("State is Required"),
  zipcode: yup
    .string()
    .required("Zipcode is Required")
    .matches(/^[0-9]+$/, "Must be only digits")
    .test(
      "len",
      "PLease enter a valid zipcode",
      (val) => val.toString().length === 5
    ),
  hourly_rate: yup
    .string()
    .required()
    .matches(/^[0-9]+$/, "Must be only digits"),
  max_mile_range: yup
    .string()
    .required()
    .matches(/^[0-9]+$/, "Must be only digits"),
});

export const updatePasswordSchema = yup.object().shape({
  password: yup
    .string()
    .required("Password is Required")
    .min(7, "Password must be at least 7 characters"),
  previous_password: yup.string().required("Previous Password is Required"),
});

export const forgotPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .required("Password is Required")
    .min(7, "Password must be at least 7 characters"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords don't match!")
    .required("Required"),
});

export const newPostSchema = yup.object().shape({
  title: yup.string().required("Title is Required"),
  message: yup.string().required("Message is Required"),
});

export const submitReviewSchema = yup.object().shape({
  star_rating: yup.string().required("A Star Rating is Required"),
  message: yup.string().required("Message is Required"),
});
