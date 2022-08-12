const Joi = require("joi");

const UserPayloadSchema = Joi.object({
  nik: Joi.string().length(16).required(),
  role: Joi.string().required(),
});

module.exports = { UserPayloadSchema };
