const DaoChat = require("../daos/ChatDaoMongoDb.js");
const Chat = DaoChat.getInstance();


const getChat = async () => {
    try {
        const chats = await Chat.getAll()
        return chats
    } catch (error) {
        logger.error(`No estás autenticado: ${error}`)}
}

const getByUsername = async (username) => {
    return await Chat.getByUsername(username)
}
const createMessage = async(username, message) => {
    try {
        const userMessage = await Chat.create(username, message)
        return userMessage
    } catch (error) {
      throw new CustomError(500, error);
    }           
  }

module.exports =  {getChat, getByUsername, createMessage}