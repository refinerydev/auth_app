class AuthenticationsHandler {
  constructor(usersService, tokenManager, validator) {
    this._usersService = usersService;
    this._tokenManager = tokenManager;
    this._validator = validator;

    this.postAuthenticationHandler = this.postAuthenticationHandler.bind(this);
  }

  async postAuthenticationHandler(request, h) {
    this._validator.validatePostAuthenticationPayload(request.payload);

    const { nik, password } = request.payload;

    const user = await this._usersService.verifyUserCredential(nik, password);

    const userId = user.id;

    const accessToken = this._tokenManager.generateAccessToken({ userId });

    user.accessToken = accessToken;

    const response = h.response({
      status: "success",
      message: "Authenticated",
      data: {
        user,
      },
    });
    response.code(200);
    return response;
  }
}

module.exports = AuthenticationsHandler;
