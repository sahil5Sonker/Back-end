import Joi from "joi";

// 🟢 Category Validation

export const createCategorySchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .required()
    .pattern(/^[a-zA-Z0-9\s]+$/) // Example pattern to allow alphanumeric characters and spaces
    .messages({
      'string.min': 'Name must be at least 3 characters long',
      'string.max': 'Name must be less than 30 characters long',
      'string.pattern.base': 'Name can only contain alphanumeric characters and spaces',
    }),
});



export const signUpSchema = Joi.object({
  firstName: Joi.string().min(2).max(50).required(),
  lastName: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .messages({ "any.only": "Passwords do not match" }),
  country: Joi.string().min(2).max(50).required(),
  region: Joi.string().min(2).max(50).required(),
  phoneNumber: Joi.string()
    .pattern(/^[0-9]{10,15}$/)
    .required()
    .messages({ "string.pattern.base": "Phone number must be between 10-15 digits" }),
  countryCode: Joi.string().min(1).max(5).required(), // ✅ Ensure countryCode is required
  role: Joi.number().valid(0, 1).default(0),
});


// 🟢 User Login Validation
export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

// 🟢 Product Validation Schema
export const createProductSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(10).max(500).required(),
  price: Joi.number().positive().precision(2).required(),
  category: Joi.string().required(),
  quantity : Joi.number().integer().min(1).required(),
});
