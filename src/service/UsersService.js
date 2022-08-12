const { nanoid } = require("nanoid");
const generator = require("generate-password");

class UsersService {
  constructor() {
    this._users = [];
  }

  async addUser({ nik, role }) {
    const id = nanoid(16);

    const password = generator.generate({
      length: 6,
      numbers: true,
    });

    const newUser = {
      id,
      nik,
      role,
      password,
    };

    this._users.push(newUser);

    const user = this._users.filter((user) => user.id === id);

    const isSuccess = user.length > 0;

    if (!isSuccess) {
      throw new Error("Registration failed");
    }

    return user;
  }
}

module.exports = UsersService;
