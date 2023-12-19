const Chat = require("../models/chatModel.js");
let instance;

class ContenedorMongoDbChat {
  constructor() { 
    this.collection = Chat;
}

async getAll(){
  try {
    const chats = await this.collection.find();
    return chats
  } catch (err) {
    console.log(` ${err}`)
  }
}

async create(email, message){
  try {
    const userMessage = new this.collection({email:email, message:message, timestamp:Date.now()})
    await userMessage.save()
    return userMessage
  } catch (err) {
    console.log(` ${err}`)
  }           
}

async getByEmail(email) {
  try {
    const chats = await this.collection.find({ email: email});
    return chats
  } catch (err) {
    console.log(` ${err}`)
  }
}

static getInstance() {
  if (!instance) instance = new ContenedorMongoDbChat();
  return instance;
}

}

module.exports = ContenedorMongoDbChat;