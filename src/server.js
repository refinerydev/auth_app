require("dotenv").config();

const Hapi = require("@hapi/hapi");

const users = require("./api/users");
const UsersService = require("./service/UsersService");

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

  await server.register([
    {
      plugin: users,
      options: {
        service: usersService,
      },
    },
  ]);

  await server.start();
  console.log(server.info.uri);
};

init();
