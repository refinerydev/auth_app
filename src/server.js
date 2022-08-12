require("dotenv").config();

const Hapi = require("@hapi/hapi");

const users = require("./api/users");
const UsersService = require("./service/UsersService");
const UsersValidator = require("./validator/users");

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
      plugin: users,
      options: {
        service: usersService,
        validator: UsersValidator,
      },
    },
  ]);

  await server.start();
  console.log(server.info.uri);
};

init();
