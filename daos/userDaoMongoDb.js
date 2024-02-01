let User = require("../models/userModel.js");
let instance;

class ContenedorMongoDbUsers {
  constructor() {
    this.collection = User;
  }
  async createUser(newUser) {
    try {
      const existingUser = await Users.create(newUser);
      return existingUser;
    } catch (err) {
      console.log(err);
    }
  }
  static getInstance() {
    if (!instance) instance = new ContenedorMongoDbUsers();
    return instance;
  }
}
module.exports = ContenedorMongoDbUsers;
