// Validation
const Joi = require("@hapi/joi");

const registerValidation = data => {
  const schema = {
    name: Joi.string()
      .min(6)
      .required(),
    email: Joi.string()
      .min(6)
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .required()
  };
  return Joi.validate(data, schema);
};

const loginValidation = data => {
  const schema = {
    email: Joi.string()
      .min(6)
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .required()
  };
  return Joi.validate(data, schema);
};

const ongValidation = data => {
  const schema = {
    name: Joi.string()
      .min(6)
      .required(),
    foundation: Joi.date().required(),
    cnpj: Joi.number().optional(),
    interest: Joi.string().required(),
    state: Joi.string()
      .min(2)
      .max(2)
      .required(),
    city: Joi.string()
      .min(3)
      .required(),
    district: Joi.string()
      .min(3)
      .required(),
    address: Joi.string()
      .min(4)
      .required(),
    photo: Joi.string()
      .min(6)
      .required(),
    preferencePet: Joi.string().required(),
    description: Joi.string()
      .min(100)
      .required()
  };
  return Joi.validate(data, schema);
};

module.exports = {
  ongValidation,
  registerValidation,
  loginValidation
};
