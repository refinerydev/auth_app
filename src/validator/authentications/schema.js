const Joi = require("joi");

const PostAuthenticationPayloadSchema = Joi.object({
  nik: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = { PostAuthenticationPayloadSchema };
