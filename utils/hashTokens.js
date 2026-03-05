const bcrypt = require("bcryptjs");
const Joi = require("joi");

/*a fun takes joi.object and returns error if the input is invalid , 
returns flow control to the next line of its call if input is valid*/
const validator = require("../validator/validate");

//takes string tokens and returns hashed version of the string
//if the input is not string or empty it returns error message

const hashTokens = async (token) => {
  const schema = Joi.object({
    token: Joi.string().required(),
  });

  validator(schema);
  const salt = await bcrypt.genSalt(10);
  return (hashedToken = await bcrypt.hash(token, salt));
};

module.exports = hashTokens;
