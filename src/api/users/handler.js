class UsersHandler {
  constructor(service) {
    this._service = service;

    this.postUserHandler = this.postUserHandler.bind(this);
  }

  async postUserHandler(request, h) {
    try {
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
    } catch (error) {
      const response = h.response({
        status: "fail",
        message: error.message,
      });

      response.code(500);
      return response;
    }
  }
}

module.exports = UsersHandler;
