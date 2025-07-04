
import Joi from "joi";

export const signupSchema = (payload) => {
  const schema = Joi.object({
    fullName: Joi.string().required().messages({
      "string.empty": "Fullname is required",
      "any.required": "Fullname is required",
    }),
    email: Joi.string().email().max(50).required().messages({
      "string.email": "Email must be a valid email address",
      "string.max": "Email cannot exceed {#limit} characters",
      "any.required": "Email is required",
    }),
    password: Joi.string().min(8).max(1024).required().messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least {#limit} characters long",
      "string.max": "Password cannot exceed {#limit} characters",
      "any.required": "Password is required",
    }),

  }).unknown(false);

  const validationResult = schema.validate(payload);
  return validationResult;
};

export const loginSchema = (payload) => {
  const schema = Joi.object({
    email: Joi.string().email().required().messages({
      "string.email": "Email must be a valid email address",
      "any.required": "Email is required",
    }),
    password: Joi.string().min(8).max(1024).required().messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least {#limit} characters long",
      "string.max": "Password cannot exceed {#limit} characters",
      "any.required": "Password is required",
    }),
  }).unknown(false);

  const validationResult = schema.validate(payload);
  return validationResult;
};

export const editSchema = (payload) => {
  const schema = Joi.object({
    fullName: Joi.string().required().messages({
      "string.empty": "Fullname is required",
      "any.required": "Fullname is required",
    }),
  }).unknown(false);

  const validationResult = schema.validate(payload);
  return validationResult;
};

export const passwordSchema = (payload) => {
  const schema = Joi.object({
    currentPassword: Joi.string().min(8).required(),
    password: Joi.string().min(8).required(),
    confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
  }).messages({
    "any.only": "Password and Confrim Password do not match",
  });

  const validationResult = schema.validate(payload);
  return validationResult;
};
