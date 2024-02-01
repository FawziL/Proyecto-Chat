const Chat = require("../models/chatModel.js");
let instance;

class ContenedorMongoDbChat {
  constructor() {
    this.collection = Chat;
  }
  async getAll() {
    try {
      const chats = await this.collection.find();
      return chats;
    } catch (err) {
      console.log(` ${err}`);
    }
  }
  async create(username, message) {
    try {
      const userMessage = new this.collection({
        username: username,
        message: message,
        timestamp: Date.now(),
      });
      await userMessage.save();
      return userMessage;
    } catch (err) {
      console.log(` ${err}`);
    }
  }
  async getByUsername(username) {
    try {
      const chats = await this.collection.find({ username: username });
      return chats;
    } catch (err) {
      console.log(` ${err}`);
    }
  }
  static getInstance() {
    if (!instance) instance = new ContenedorMongoDbChat();
    return instance;
  }
}
module.exports = ContenedorMongoDbChat;
