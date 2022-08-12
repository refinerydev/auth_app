const routes = (handler) => [
  {
    method: "POST",
    path: "/users",
    handler: handler.postUserHandler,
  },
  {
    method: "GET",
    path: "/users/secret",
    handler: handler.getSecretHandler,
    options: {
      auth: "auth_app_jwt",
    },
  },
];

module.exports = routes;
