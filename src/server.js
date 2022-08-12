require("dotenv").config();

const Hapi = require("@hapi/hapi");
const Jwt = require("@hapi/jwt");

const users = require("./api/users");
const UsersService = require("./service/UsersService");
const UsersValidator = require("./validator/users");

const authentications = require("./api/authentications");
const TokenManager = require("./tokenize/TokenManager");
const AuthenticationsValidator = require("./validator/authentications");

const ClientError = require("./exception/ClientError");

const init = async () => {
  const usersService = new UsersService();

  const server = Hapi.server({
    host: process.env.HOST,
    port: process.env.PORT,
    router: {
      stripTrailingSlash: true,
    },
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  server.ext("onPreResponse", (request, h) => {
    const { response } = request;

    if (response instanceof ClientError) {
      const newResponse = h.response({
        status: "fail",

        message: response.message,
      });

      newResponse.code(response.statusCode);

      return newResponse;
    }

    return response.continue || response;
  });

  await server.register([
    {
      plugin: Jwt,
    },
  ]);

  server.auth.strategy("auth_app_jwt", "jwt", {
    keys: process.env.JWT_KEY_SECRET,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: process.env.JWT_TOKEN_AGE,
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: {
        userId: artifacts.decoded.payload.userId,
        role: artifacts.decoded.payload.role,
      },
    }),
  });

  await server.register([
    {
      plugin: users,
      options: {
        service: usersService,
        validator: UsersValidator,
      },
    },
    {
      plugin: authentications,
      options: {
        usersService,
        tokenManager: TokenManager,
        validator: AuthenticationsValidator,
      },
    },
  ]);

  await server.start();
  console.log(server.info.uri);
};

init();
