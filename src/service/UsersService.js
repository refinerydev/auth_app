const { nanoid } = require("nanoid");
const generator = require("generate-password");
const InvariantError = require("../exception/InvariantError");

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
      throw new InvariantError("Registration failed");
    }

    return user[0];
  }
}

module.exports = UsersService;
