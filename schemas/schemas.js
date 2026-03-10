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

const postSchema = Joi.object({
  title: Joi.string().min(3).trim().required(),
  content: Joi.string().min(5).trim().required(),
  category_id: Joi.number().integer().required(),
  tags: Joi.array()
    .items(Joi.string().min(2).max(20).required())
    .min(1)
    .max(5)
    .required(),
});
module.exports = { registrationSchema, loginSchema, postSchema };
