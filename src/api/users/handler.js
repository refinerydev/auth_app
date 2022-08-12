class UsersHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postUserHandler = this.postUserHandler.bind(this);
  }

  async postUserHandler(request, h) {
    this._validator.validateUserPayload(request.payload);

    const { nik, role } = request.payload;

    const user = await this._service.addUser({ nik, role });

    const response = h.response({
      status: "success",
      message: "Registration success",
      data: {
        user,
      },
    });

    response.code(201);
    return response;
  }

  async getSecretHandler(request, h) {
    const { userId: userId, role: role } = request.auth.credentials;

    const response = h.response({
      status: "success",
      message: "Get private data success",
      data: {
        userId,
        role,
      },
    });

    response.code(200);

    return response;
  }
}

module.exports = UsersHandler;
