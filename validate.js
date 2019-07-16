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
      .required(),
    role: Joi.number()
      .valid([0, 1, 2])
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
    foundation: Joi.date().required(),
    cnpj: Joi.number().optional(),
    interest: Joi.any()
      .valid(["adopt", "donate", "both"])
      .required(),
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
    preferencePet: Joi.string()
      .valid(["dog", "cat", "bird", "reptile", "other"])
      .required(),
    description: Joi.string()
      .min(100)
      .required()
  };
  return Joi.validate(data, schema);
};

const commonUserValidation = data => {
  const schema = {
    lastname: Joi.string.min(3).required(),
    birthdate: Joi.date().required(),
    genere: Joi.string().valid(["male", "female"]).required(),
    cpf: Joi.number().optional(),
    interest: Joi.any()
      .valid(["adopt", "donate", "both"])
      .required(),
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
    preferencePet: Joi.string()
      .valid(["dog", "cat", "bird", "reptile", "other"])
      .required(),
    description: Joi.string()
      .min(100)
      .required()
  };
  return Joi.validate(data, schema);
};

module.exports = {
  commonUserValidation,
  ongValidation,
  registerValidation,
  loginValidation
};
