const Jwt = require('@hapi/jwt');

const TokenManager = {
  generateAccessToken: (payload) => Jwt.token.generate(payload, process.env.JWT_KEY_SECRET)
}

module.exports = TokenManager;