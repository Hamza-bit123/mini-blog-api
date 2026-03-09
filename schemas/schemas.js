const Joi = require("joi");

const registrationSchema = Joi.object({
  username: Joi.string().min(3).trim().required(),
  email: Joi.string().email().trim().required(),
  password: Joi.string().min(4).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().trim().required(),
  password: Joi.string().required(),
});
module.exports = { registrationSchema, loginSchema };
